import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link2, RotateCcw, Scissors } from 'lucide-react';
import { getLevelColor } from '../../utils/levelColors';

/**
 * Harmonic, elegant color palette for the curved lines.
 * Uses Cornelsen DaF cyan/blue as primary, with harmonized accents so crossing lines
 * remain unmistakably easy to distinguish and trace.
 */
const CURVE_PALETTE = [
  { stroke: '#0284c7', glow: 'rgba(2, 132, 199, 0.35)', fill: '#0284c7', badge: 'bg-sky-500' },
  { stroke: '#0d9488', glow: 'rgba(13, 148, 136, 0.35)', fill: '#0d9488', badge: 'bg-teal-600' },
  { stroke: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)', fill: '#8b5cf6', badge: 'bg-violet-600' },
  { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)', fill: '#f59e0b', badge: 'bg-amber-500' },
  { stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', fill: '#ec4899', badge: 'bg-pink-500' },
  { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', fill: '#10b981', badge: 'bg-emerald-500' },
  { stroke: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)', fill: '#6366f1', badge: 'bg-indigo-500' }
];

export default function CurvedLinesMatching({
  question,
  answer,
  onChange,
  level = 'B1'
}) {
  const lvlColor = getLevelColor(level);
  const containerRef = useRef(null);

  const leftDotRefs = useRef({});
  const rightDotRefs = useRef({});

  const [coords, setCoords] = useState({});
  const [selectedLeftId, setSelectedLeftId] = useState(null);
  const [selectedRightId, setSelectedRightId] = useState(null);
  const [hoveredPairStr, setHoveredPairStr] = useState(null);

  // Live dragging state: { fromSide: 'left' | 'right', fromId: string, currentX: number, currentY: number }
  const [dragState, setDragState] = useState(null);

  const leftItems = useMemo(() => question?.leftItems || [], [question]);
  const rightItems = useMemo(() => question?.rightItems || [], [question]);
  const pairs = useMemo(() => (Array.isArray(answer) ? answer : []), [answer]);

  // Assign distinct theme colors per pair
  const pairColorMap = useMemo(() => {
    const map = {};
    pairs.forEach((pStr, idx) => {
      map[pStr] = CURVE_PALETTE[idx % CURVE_PALETTE.length];
    });
    return map;
  }, [pairs]);

  /**
   * Recalculates exact dot centers relative to container top-left.
   */
  const updateCoords = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords = {};

    leftItems.forEach((item) => {
      const el = leftDotRefs.current[item.id];
      if (el) {
        const r = el.getBoundingClientRect();
        newCoords[`L_${item.id}`] = {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top
        };
      }
    });

    rightItems.forEach((item) => {
      const el = rightDotRefs.current[item.id];
      if (el) {
        const r = el.getBoundingClientRect();
        newCoords[`R_${item.id}`] = {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top
        };
      }
    });

    setCoords(newCoords);
  }, [leftItems, rightItems]);

  // Synchronize coordinates reliably across renders & window events
  useEffect(() => {
    updateCoords();
    const raf1 = requestAnimationFrame(updateCoords);
    const timer1 = setTimeout(updateCoords, 60);
    const timer2 = setTimeout(updateCoords, 250);

    const ro = new ResizeObserver(() => {
      updateCoords();
    });

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords, true);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timer1);
      clearTimeout(timer2);
      ro.disconnect();
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [updateCoords, pairs.length]);

  const getPairForLeft = (lId) =>
    pairs.find((p) => p.split(' ')[0] === lId);
  const getPairForRight = (rId) =>
    pairs.find((p) => p.split(' ')[1] === rId);

  /**
   * Connect a left item and a right item
   */
  const connectPair = (lId, rId) => {
    if (!lId || !rId) return;
    const filtered = pairs.filter((p) => {
      const [l, r] = p.split(' ');
      return l !== lId && r !== rId;
    });
    onChange([...filtered, `${lId} ${rId}`]);
    setSelectedLeftId(null);
    setSelectedRightId(null);
  };

  /**
   * Removes an existing pair
   */
  const removePair = (pairStr) => {
    onChange(pairs.filter((p) => p !== pairStr));
    if (hoveredPairStr === pairStr) setHoveredPairStr(null);
  };

  /**
   * Click on Left Item / Dot
   */
  const handleLeftClick = (lId) => {
    if (selectedRightId) {
      connectPair(lId, selectedRightId);
      return;
    }

    const existingPair = getPairForLeft(lId);
    if (selectedLeftId === lId) {
      setSelectedLeftId(null);
      return;
    }

    if (existingPair && selectedLeftId !== lId) {
      removePair(existingPair);
      setSelectedLeftId(lId);
      return;
    }

    setSelectedLeftId(lId);
  };

  /**
   * Click on Right Item / Dot
   */
  const handleRightClick = (rId) => {
    if (selectedLeftId) {
      connectPair(selectedLeftId, rId);
      return;
    }

    const existingPair = getPairForRight(rId);
    if (selectedRightId === rId) {
      setSelectedRightId(null);
      return;
    }

    if (existingPair && selectedRightId !== rId) {
      removePair(existingPair);
      setSelectedRightId(rId);
      return;
    }

    setSelectedRightId(rId);
  };

  // ═════════════════════════════════════════════════════════════
  // DRAG & DROP POINTER HANDLING (Tactile Drawing of Curved Lines)
  // ═════════════════════════════════════════════════════════════
  const handlePointerDown = (e, side, id) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setDragState({
      fromSide: side,
      fromId: id,
      currentX,
      currentY
    });

    if (side === 'left') {
      setSelectedLeftId(id);
      setSelectedRightId(null);
    } else {
      setSelectedRightId(id);
      setSelectedLeftId(null);
    }

    const onPointerMove = (moveEvent) => {
      const liveRect = containerRef.current?.getBoundingClientRect();
      if (!liveRect) return;
      setDragState((prev) =>
        prev
          ? {
              ...prev,
              currentX: moveEvent.clientX - liveRect.left,
              currentY: moveEvent.clientY - liveRect.top
            }
          : null
      );
    };

    const onPointerUp = (upEvent) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      // Find element under pointer
      const targetEls = document.elementsFromPoint(upEvent.clientX, upEvent.clientY);
      let targetLeftId = null;
      let targetRightId = null;

      for (const el of targetEls) {
        const lAttr = el.getAttribute?.('data-left-id');
        const rAttr = el.getAttribute?.('data-right-id');
        if (lAttr) targetLeftId = lAttr;
        if (rAttr) targetRightId = rAttr;
      }

      if (side === 'left' && targetRightId) {
        connectPair(id, targetRightId);
      } else if (side === 'right' && targetLeftId) {
        connectPair(targetLeftId, id);
      }

      setDragState(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Compute cubic Bezier curve path and midpoint
  const computeBezierPath = (x1, y1, x2, y2) => {
    const dx = Math.abs(x2 - x1);
    const curvature = Math.max(26, Math.min(125, dx * 0.45));
    const cx1 = x1 + curvature;
    const cy1 = y1;
    const cx2 = x2 - curvature;
    const cy2 = y2;
    const path = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

    // Midpoint at t = 0.5
    const mx = 0.125 * x1 + 0.375 * cx1 + 0.375 * cx2 + 0.125 * x2;
    const my = 0.125 * y1 + 0.375 * cy1 + 0.375 * cy2 + 0.125 * y2;
    return { path, mx, my };
  };

  return (
    <div className="space-y-3.5 select-none">
      {/* Top Interactive Bar */}
      <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-surface-container-low/90 dark:bg-[#22242A] shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-on-surface">
          <span className={`w-7 h-7 rounded-xl ${lvlColor.softBg} ${lvlColor.accentText} flex items-center justify-center shrink-0`}>
            <Link2 className="w-4 h-4" />
          </span>
          <span className="leading-snug">
            Aussage antippen, dann passende Antwort verbinden. Linien können mit ✂ getrennt werden.
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-full bg-surface-container dark:bg-white/[0.08] text-on-surface-variant">
            {pairs.length} / {leftItems.length} verbunden
          </div>
          {pairs.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => {
                onChange([]);
                setSelectedLeftId(null);
                setSelectedRightId(null);
                setHoveredPairStr(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-rose-500 hover:underline transition-colors px-2 py-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Alle trennen</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Two-Column Matching Arena with Interactive SVG Canvas */}
      <div
        ref={containerRef}
        className="relative rounded-3xl bg-surface-container-lowest dark:bg-[#1A1C20] p-2 sm:p-4 md:p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* SVG Overlay for Curved Bezier Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ overflow: 'visible' }}
        >
          {/* Render Active Established Bezier Curves */}
          {pairs.map((pStr, idx) => {
            const [lId, rId] = pStr.split(' ');
            const c1 = coords[`L_${lId}`];
            const c2 = coords[`R_${rId}`];
            if (!c1 || !c2) return null;

            const palette = pairColorMap[pStr] || CURVE_PALETTE[idx % CURVE_PALETTE.length];
            const isHovered = hoveredPairStr === pStr;
            const { path, mx, my } = computeBezierPath(c1.x, c1.y, c2.x, c2.y);

            return (
              <g key={pStr} className="group">
                {/* Wide invisible path for comfortable touch-to-cut */}
                <path
                  d={path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="28"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredPairStr(pStr)}
                  onMouseLeave={() => setHoveredPairStr((cur) => (cur === pStr ? null : cur))}
                  onClick={() => removePair(pStr)}
                />

                {/* Ambient Glow Effect */}
                <path
                  d={path}
                  fill="none"
                  stroke={palette.stroke}
                  strokeWidth={isHovered ? '9' : '6'}
                  strokeOpacity={isHovered ? '0.45' : '0.22'}
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />

                {/* Primary Crisp Bezier Stroke */}
                <path
                  d={path}
                  fill="none"
                  stroke={palette.stroke}
                  strokeWidth={isHovered ? '4.5' : '3.5'}
                  strokeLinecap="round"
                  className="transition-all duration-200 pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredPairStr(pStr)}
                  onMouseLeave={() => setHoveredPairStr((cur) => (cur === pStr ? null : cur))}
                  onClick={() => removePair(pStr)}
                />

                {/* ═════════════════════════════════════════════════════════════ */}
                {/* LINE CUT BADGE: THEMED SCISSORS NODE (NO RED, NO ERROR LOOK)  */}
                {/* ═════════════════════════════════════════════════════════════ */}
                {isHovered ? (
                  /* Expanded Capsule on Hover/Active Touch */
                  <g
                    transform={`translate(${mx}, ${my})`}
                    className="pointer-events-auto cursor-pointer animate-in zoom-in-95 duration-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePair(pStr);
                    }}
                    onMouseEnter={() => setHoveredPairStr(pStr)}
                    onMouseLeave={() => setHoveredPairStr((cur) => (cur === pStr ? null : cur))}
                  >
                    <rect x="-38" y="-18" width="76" height="36" fill="transparent" className="cursor-pointer" />
                    <rect
                      x="-35"
                      y="-13"
                      width="70"
                      height="26"
                      rx="13"
                      fill="#ffffff"
                      stroke={palette.stroke}
                      strokeWidth="2"
                      className="dark:fill-[#1E2024] drop-shadow-md cursor-pointer"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill={palette.stroke}
                      fontSize="10.5"
                      fontWeight="800"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      className="pointer-events-none select-none tracking-tight"
                    >
                      ✂ Trennen
                    </text>
                  </g>
                ) : (
                  /* Elegant, Themed Circular Scissor Anchor */
                  <g
                    transform={`translate(${mx}, ${my})`}
                    className="pointer-events-auto cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePair(pStr);
                    }}
                    onMouseEnter={() => setHoveredPairStr(pStr)}
                    onMouseLeave={() => setHoveredPairStr((cur) => (cur === pStr ? null : cur))}
                  >
                    {/* Generous touch hitbox: 44px diameter */}
                    <circle r="22" fill="transparent" className="cursor-pointer" />

                    {/* Outer circle with matching line palette stroke (Theme Color, NOT Red) */}
                    <circle
                      r="11"
                      fill="#ffffff"
                      stroke={palette.stroke}
                      strokeWidth="2"
                      className="dark:fill-[#1E2024] drop-shadow-sm transition-all duration-150 cursor-pointer"
                    />

                    {/* Inner soft tint */}
                    <circle
                      r="8"
                      fill={palette.stroke}
                      fillOpacity="0.14"
                      className="transition-all duration-150 cursor-pointer"
                    />

                    {/* Crisp Scissors icon in line's own color */}
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={palette.stroke}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      className="pointer-events-none select-none"
                    >
                      ✂
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render In-Progress Drag Bezier Curve */}
          {dragState && (() => {
            const isLeft = dragState.fromSide === 'left';
            const originCoord = isLeft
              ? coords[`L_${dragState.fromId}`]
              : coords[`R_${dragState.fromId}`];

            if (!originCoord) return null;

            const x1 = isLeft ? originCoord.x : dragState.currentX;
            const y1 = isLeft ? originCoord.y : dragState.currentY;
            const x2 = isLeft ? dragState.currentX : originCoord.x;
            const y2 = isLeft ? dragState.currentY : originCoord.y;

            const { path } = computeBezierPath(x1, y1, x2, y2);

            return (
              <g>
                <path
                  d={path}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="7"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                />
                <path
                  d={path}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  strokeDasharray="8 5"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </g>
            );
          })()}
        </svg>

        {/* Two-Column Side-by-Side Arena (Always in 2 Columns like the original Cornelsen UX) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 relative z-10">
          {/* ═════════════════════════════════════════════════════════════ */}
          {/* COLUMN A (Left: Questions / Prompts)                          */}
          {/* ═════════════════════════════════════════════════════════════ */}
          <div className="space-y-2 sm:space-y-2.5">
            <div className="px-1 flex items-center justify-between">
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-on-surface-variant truncate">
                Spalte A
              </h4>
              <span className="text-[9px] sm:text-[10px] font-bold text-sky-600 dark:text-sky-400">
                Punkte antippen
              </span>
            </div>

            <div className="space-y-2 sm:space-y-2.5">
              {leftItems.map((item, idx) => {
                const pairStr = getPairForLeft(item.id);
                const isPaired = Boolean(pairStr);
                const isSelected = selectedLeftId === item.id;
                const palette = pairStr ? pairColorMap[pairStr] : null;

                return (
                  <motion.div
                    key={item.id}
                    data-left-id={item.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => handleLeftClick(item.id)}
                    className={`group relative p-2 sm:p-3 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-1.5 sm:gap-2.5 ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/45 border-2 border-sky-500 shadow-md ring-2 ring-sky-500/25'
                        : isPaired
                        ? 'bg-surface-container-low/95 dark:bg-[#25272D] border border-surface-variant/50 shadow-sm'
                        : 'bg-surface-container-low/75 dark:bg-[#202227] hover:bg-surface-container dark:hover:bg-[#272930] border border-transparent shadow-sm'
                    }`}
                  >
                    {/* Item Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] sm:text-xs md:text-sm font-bold text-on-surface leading-tight sm:leading-snug break-words">
                        {item.text}
                      </p>
                    </div>

                    {/* Circular Connector Dot / Joint Point on Right Edge */}
                    <div
                      data-left-id={item.id}
                      ref={(el) => {
                        if (el) leftDotRefs.current[item.id] = el;
                      }}
                      onPointerDown={(e) => handlePointerDown(e, 'left', item.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLeftClick(item.id);
                      }}
                      className="shrink-0 p-2 -mr-1.5 flex items-center justify-center cursor-pointer touch-none select-none"
                      title="Gelenkpunkt zum Verbinden klicken oder ziehen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          backgroundColor: isSelected
                            ? '#0284c7'
                            : isPaired
                            ? palette?.fill || '#0284c7'
                            : '#0ea5e9',
                          borderColor: isSelected
                            ? '#0284c7'
                            : isPaired
                            ? palette?.stroke || '#0284c7'
                            : '#38bdf8'
                        }}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all flex items-center justify-center shadow-sm cursor-pointer ${
                          isSelected
                            ? 'ring-4 ring-sky-500/35 scale-125'
                            : isPaired
                            ? 'ring-2 ring-black/10 dark:ring-white/15'
                            : 'opacity-90 hover:opacity-100 hover:scale-115'
                        }`}
                      >
                        {isPaired && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm pointer-events-none" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* COLUMN B (Right: Answers / Responses)                         */}
          {/* ═════════════════════════════════════════════════════════════ */}
          <div className="space-y-2 sm:space-y-2.5">
            <div className="px-1 flex items-center justify-between">
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-on-surface-variant truncate">
                Spalte B
              </h4>
              <span className="text-[9px] sm:text-[10px] font-bold text-sky-600 dark:text-sky-400">
                Punkte antippen
              </span>
            </div>

            <div className="space-y-2 sm:space-y-2.5">
              {rightItems.map((item, idx) => {
                const pairStr = getPairForRight(item.id);
                const isPaired = Boolean(pairStr);
                const isSelected = selectedRightId === item.id;
                const palette = pairStr ? pairColorMap[pairStr] : null;

                return (
                  <motion.div
                    key={item.id}
                    data-right-id={item.id}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => handleRightClick(item.id)}
                    className={`group relative p-2 sm:p-3 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-1.5 sm:gap-2.5 ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/45 border-2 border-sky-500 shadow-md ring-2 ring-sky-500/25'
                        : isPaired
                        ? 'bg-surface-container-low/95 dark:bg-[#25272D] border border-surface-variant/50 shadow-sm'
                        : selectedLeftId
                        ? 'bg-sky-500/[0.08] dark:bg-sky-500/[0.15] border border-sky-500/40 hover:border-sky-500 shadow-sm'
                        : 'bg-surface-container-low/75 dark:bg-[#202227] hover:bg-surface-container dark:hover:bg-[#272930] border border-transparent shadow-sm'
                    }`}
                  >
                    {/* Circular Connector Dot / Joint Point on Left Edge */}
                    <div
                      data-right-id={item.id}
                      ref={(el) => {
                        if (el) rightDotRefs.current[item.id] = el;
                      }}
                      onPointerDown={(e) => handlePointerDown(e, 'right', item.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRightClick(item.id);
                      }}
                      className="shrink-0 p-2 -ml-1.5 flex items-center justify-center cursor-pointer touch-none select-none"
                      title="Gelenkpunkt zum Verbinden klicken oder ziehen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          backgroundColor: isSelected
                            ? '#0284c7'
                            : isPaired
                            ? palette?.fill || '#0284c7'
                            : '#0ea5e9',
                          borderColor: isSelected
                            ? '#0284c7'
                            : isPaired
                            ? palette?.stroke || '#0284c7'
                            : '#38bdf8'
                        }}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all flex items-center justify-center shadow-sm cursor-pointer ${
                          isSelected
                            ? 'ring-4 ring-sky-500/35 scale-125'
                            : isPaired
                            ? 'ring-2 ring-black/10 dark:ring-white/15'
                            : 'opacity-90 hover:opacity-100 hover:scale-115'
                        }`}
                      >
                        {isPaired && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm pointer-events-none" />
                        )}
                      </motion.div>
                    </div>

                    {/* Item Text */}
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[11px] sm:text-xs md:text-sm font-bold text-on-surface leading-tight sm:leading-snug break-words">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MOBILE-OPTIMIZED ACTIVE CONNECTIONS TRAY WITH NEUTRAL TRENEN  */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {pairs.length > 0 && (
          <div className="mt-4 pt-3 border-t border-surface-variant/40 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant px-1">
              <span>Ihre Zuordnungen ({pairs.length})</span>
              <span className="text-[10px] lowercase font-semibold opacity-75">
                Tippen zum Trennen
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {pairs.map((pStr, idx) => {
                const [lId, rId] = pStr.split(' ');
                const lItem = leftItems.find((i) => i.id === lId);
                const rItem = rightItems.find((i) => i.id === rId);
                const palette = pairColorMap[pStr] || CURVE_PALETTE[idx % CURVE_PALETTE.length];

                return (
                  <motion.button
                    key={pStr}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removePair(pStr)}
                    className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-surface-container-low dark:bg-[#25272D] hover:bg-surface-container-high border border-surface-variant/60 transition-all text-left shadow-sm cursor-pointer"
                    title="Verbindung trennen"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: palette.stroke }}
                    />
                    <span className="text-[10px] sm:text-xs font-bold text-on-surface truncate max-w-[110px] sm:max-w-[180px]">
                      {lItem ? lItem.text : lId}
                    </span>
                    <span className="text-[10px] text-on-surface-variant opacity-60">➔</span>
                    <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant truncate max-w-[90px] sm:max-w-[150px]">
                      {rItem ? rItem.text : rId}
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[10px] font-bold shrink-0 group-hover:text-rose-500 transition-colors">
                      <Scissors className="w-2.5 h-2.5" />
                      <span>Trennen</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
