const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// @route   POST /api/jitsi/token
// @desc    Generate or return 8x8 JaaS JWT token using direct env Private Key or local file
// @access  Public
router.post('/token', (req, res) => {
  try {
    const { roomId, username = 'Guest', role = 'student', email, userId } = req.body;

    const jaasAppId = process.env.JAAS_APP_ID || 'vpaas-magic-cookie-9c8d3d139d304e2ab96e890e756b9a0a';
    let jaasApiKey = process.env.JAAS_API_KEY || 'vpaas-magic-cookie-9c8d3d139d304e2ab96e890e756b9a0a/1c6de4';
    const staticJwt = process.env.JAAS_JWT;

    let privateKey = process.env.JAAS_PRIVATE_KEY;

    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    } else {
      console.error('[JaaS] JAAS_PRIVATE_KEY is missing in .env!');
      return res.status(500).json({ success: false, message: 'JAAS_PRIVATE_KEY missing in .env' });
    }

    const formattedRoomName = `${jaasAppId}/LiveSprachzentrum_${roomId || 'default'}`;
    const isModerator = true;

    // 1. If static JWT token is provided in .env
    if (staticJwt) {
      console.log('[JaaS] Serving static JWT from .env');
      return res.json({
        success: true,
        token: staticJwt,
        appId: jaasAppId,
        roomName: formattedRoomName,
        isModerator
      });
    }

    // Format kid as "AppId/KeyId"
    const rawKeyId = jaasApiKey.replace(/^vpaas-magic-cookie-[^/]+\//, '');
    const formattedKid = `${jaasAppId}/${rawKeyId}`;

    // 2. Dynamically sign 8x8 JaaS RS256 JWT using Private Key
    if (jaasApiKey && privateKey) {
      const now = Math.floor(Date.now() / 1000);

      const payload = {
        aud: 'jitsi',
        iss: 'chat',
        sub: jaasAppId,
        room: '*',
        exp: now + 86400, // 24 hours
        nbf: now - 10,
        context: {
          user: {
            id: userId || username,
            name: username,
            email: email || `${username.toLowerCase().replace(/\s+/g, '')}@live-sprachzentrum.de`,
            avatar: '',
            moderator: true
          },
          features: {
            recording: true,
            livestreaming: true,
            'screen-sharing': true
          }
        }
      };

      const token = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        header: {
          alg: 'RS256',
          kid: formattedKid,
          typ: 'JWT'
        }
      });

      console.log(`[JaaS] Signed 24h JWT token for user '${username}' in room '${roomId}' with kid '${formattedKid}'`);

      return res.json({
        success: true,
        token,
        appId: jaasAppId,
        roomName: formattedRoomName,
        isModerator
      });
    }

    console.warn('[JaaS] Private key or API key missing! Token generated as null.');
    return res.json({
      success: true,
      token: null,
      appId: jaasAppId,
      roomName: formattedRoomName,
      isModerator
    });

  } catch (error) {
    console.error('[JaaS] Error generating 8x8 JaaS token:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process JaaS token request',
      error: error.message
    });
  }
});

module.exports = router;
