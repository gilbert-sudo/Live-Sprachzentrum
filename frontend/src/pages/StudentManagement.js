import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminStudents, createAdminStudent, updateAdminStudent, deleteAdminStudent } from '../store/adminStudentsSlice';
import { getLevelColor } from '../utils/levelColors';

export default function StudentManagement() {
  const { user } = useSelector((state) => state.auth);
  const { students: users, status } = useSelector((state) => state.adminStudents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = status === 'loading';
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, selectedClass]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // hardcoded
    level: 'A1',
    phone: '',
    gender: 'female',
    birthday: '',
    photo: '',
    subscription: {
      paymentType: 'full',
      firstPaymentPaid: false,
      secondPaymentPaid: false,
    }
  });

  useEffect(() => {
    dispatch(fetchAdminStudents());
  }, [dispatch]);

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
  };

  const handleOpenModal = (u = null) => {
    if (u) {
      setEditingUser(u);
      setFormData({
        name: u.name || '',
        email: u.email || '',
        password: u.plainPassword || '',
        role: 'student',
        level: u.level || 'A1',
        phone: u.phone || '',
        gender: u.gender || 'female',
        birthday: u.birthday ? new Date(u.birthday).toISOString().split('T')[0] : '',
        photo: u.photo || '',
        subscription: {
          paymentType: u.subscription?.paymentType || 'full',
          firstPaymentPaid: u.subscription?.firstPaymentPaid || false,
          secondPaymentPaid: u.subscription?.secondPaymentPaid || false,
        },
        status: u.status || 'active',
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '', email: '', password: generatePassword(), role: 'student', level: selectedClass || 'A1', phone: '', gender: 'female', birthday: '', photo: '', status: 'active',
        subscription: { paymentType: 'full', firstPaymentPaid: false, secondPaymentPaid: false }
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setShowPassword(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('avatar', file);

    try {
      setUploadingImage(true);
      const config = { headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/upload/avatar', uploadData, config);
      setFormData({ ...formData, photo: data.url });
    } catch (err) {
      console.error(err);
      alert('Erreur lors du téléchargement de l\'image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await dispatch(updateAdminStudent({ id: editingUser._id, studentData: formData })).unwrap();
      } else {
        await dispatch(createAdminStudent(formData)).unwrap();
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert(err || 'Une erreur s\'est produite.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return;
    try {
      await dispatch(deleteAdminStudent(id)).unwrap();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression de l\'étudiant.');
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Voulez-vous valider cet étudiant ?')) return;
    try {
      await dispatch(updateAdminStudent({ id, studentData: { status: 'active' } })).unwrap();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la validation.');
    }
  };

  const existingClasses = useMemo(() => {
    const levels = [...new Set(users.map(u => u.level))].filter(Boolean);
    // Sort levels logically (A1, A2, B1, B2, C1, C2)
    return levels.sort((a, b) => a.localeCompare(b));
  }, [users]);

  const filteredUsers = users.filter(u => {
    if (selectedClass && u.level !== selectedClass) return false;

    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.badgeNumber && u.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u._id && u._id.toLowerCase().includes(searchQuery.toLowerCase()));

    const userStatus = u.status || 'active';
    const matchesStatus = statusFilter === 'all' || userStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => selectedClass ? setSelectedClass(null) : navigate(-1)} className="p-2 -ml-2 bg-surface hover:bg-surface-variant rounded-full text-secondary hover:text-on-surface transition-colors flex items-center justify-center shadow-sm border border-surface-variant">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            {selectedClass ? `Étudiants - Classe ${selectedClass}` : 'Gestion des étudiants (Classes)'}
          </h2>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-germany-gold text-white px-4 py-2.5 rounded-xl hover:bg-yellow-600 flex items-center justify-center gap-2 transition-colors shadow-lg font-bold w-full md:w-auto shrink-0"
        >
          <span className="material-symbols-outlined">person_add</span>
          Nouvel étudiant
        </button>
      </div>

      {error && <div className="text-germany-red">{error}</div>}

      {!selectedClass ? (
        // Classes View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-8">Chargement des classes...</div>
          ) : existingClasses.length === 0 ? (
            <div className="col-span-full text-center py-8 bg-surface-container-lowest rounded-xl border border-surface-variant text-secondary">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">school</span>
              <p>Aucune classe trouvée.</p>
            </div>
          ) : (
            existingClasses.map((className) => {
              const studentsInClass = users.filter(u => u.level === className);
              const pendingCount = studentsInClass.filter(u => u.status === 'pending').length;

              return (
                <div 
                  key={className}
                  onClick={() => setSelectedClass(className)}
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md border border-surface-variant hover:border-germany-gold transition-all cursor-pointer group flex flex-col items-center text-center gap-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-inner mt-2 ${getLevelColor(className).badge}`}>
                    {className}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface group-hover:text-germany-gold transition-colors">Classe {className}</h3>
                    <p className="text-secondary text-sm">{studentsInClass.length} étudiant{studentsInClass.length !== 1 ? 's' : ''}</p>
                  </div>
                  {pendingCount > 0 && (
                    <div className="mt-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      {pendingCount} en attente
                    </div>
                  )}
                  <button className="mt-2 w-full py-2 rounded-xl bg-surface-container group-hover:bg-germany-gold group-hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    Voir les étudiants <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      ) : (
        // Students Table View
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant relative animate-fade-in">
          <div className="w-full">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-[56px] md:top-[72px] z-20 shadow-md">
                <tr className="bg-surface-container-lowest">
                  <th colSpan="5" className="p-0 border-b border-surface-variant rounded-t-xl overflow-hidden">
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-surface-container/30">
                      <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
                        <input
                          type="text"
                          placeholder="Rechercher par nom, e-mail ou ID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl border border-surface-variant focus:outline-none focus:border-germany-gold focus:ring-1 focus:ring-germany-gold transition-all text-sm font-medium"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-4 py-2.5 bg-surface rounded-xl border border-surface-variant focus:outline-none focus:border-germany-gold focus:ring-1 focus:ring-germany-gold transition-all text-sm font-medium text-on-surface"
                        >
                          <option value="all">Tous les statuts</option>
                          <option value="active">Actif</option>
                          <option value="pending">En attente (Warteliste)</option>
                          <option value="rejected">Rejeté</option>
                        </select>
                      </div>
                    </div>
                  </th>
                </tr>
                <tr className="bg-surface-container-low text-on-surface-variant text-sm border-b border-surface-variant">
                  <th className="p-4 font-medium">Nom</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Niveau</th>
                  <th className="p-4 font-medium">Statut des frais</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="5" className="p-4 text-center">Chargement...</td></tr>
                ) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                        <p>Aucun étudiant trouvé.</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedUsers.map(u => (
                  <tr key={u._id} className={`border-b border-surface-variant last:border-0 transition-colors ${u.status === 'pending' ? 'bg-germany-gold/10 hover:bg-germany-gold/20' :
                      u.status === 'rejected' ? 'bg-germany-red/10 hover:bg-germany-red/20' :
                        'hover:bg-surface-container/50'
                    }`}>
                    <td className="p-4 font-bold text-on-surface cursor-pointer group" onClick={() => setViewingUser(u)}>
                      <div className="flex items-center gap-3">
                        {u.photo ? (
                          <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-surface-variant shrink-0 group-hover:ring-2 ring-germany-gold transition-all" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-secondary border border-surface-variant shrink-0 group-hover:ring-2 ring-germany-gold transition-all">
                            <span className="material-symbols-outlined text-[20px]">person</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="group-hover:text-germany-gold transition-colors">{u.name}</span>
                          {u.badgeNumber && (
                            <div className="flex items-center gap-1 text-xs text-secondary font-medium mt-0.5">
                              <span className="material-symbols-outlined text-[14px]">badge</span>
                              <span className="font-mono tracking-widest">{u.badgeNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-secondary">
                          <span className="material-symbols-outlined text-[16px]">mail</span>
                          <span>{u.email}</span>
                        </div>
                        {u.phone && (
                          <div className="flex items-center gap-2 text-secondary/70 text-xs mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">phone</span>
                            <span>{u.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest ${getLevelColor(u.level).badge}`}>
                        {u.level}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-surface-variant text-on-surface-variant border border-surface-subtle" title={u.subscription?.paymentType === 'full' ? 'En une fois' : 'En deux fois'}>
                          {u.subscription?.paymentType === 'full' ? '1x' : '2x'}
                        </span>
                        {u.subscription?.paymentType === 'full' ? (
                          <div className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${u.subscription?.firstPaymentPaid ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`} title={u.subscription?.firstPaymentPaid ? 'Payé' : 'Non payé'}>
                            <span className="material-symbols-outlined text-[12px]">{u.subscription?.firstPaymentPaid ? 'check' : 'close'}</span>
                            Payé
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${u.subscription?.firstPaymentPaid ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`} title="1er paiement">
                              <span className="material-symbols-outlined text-[12px]">{u.subscription?.firstPaymentPaid ? 'check' : 'close'}</span>
                              1er
                            </div>
                            <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${u.subscription?.secondPaymentPaid ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`} title="2ème paiement">
                              <span className="material-symbols-outlined text-[12px]">{u.subscription?.secondPaymentPaid ? 'check' : 'close'}</span>
                              2ème
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2 flex-nowrap">
                        {u.status === 'pending' && (
                          <button onClick={() => handleApprove(u._id)} className="w-8 h-8 flex items-center justify-center bg-green-50 hover:bg-green-100 text-green-600 rounded-full transition-colors shrink-0" title="Valider l'étudiant">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          </button>
                        )}
                        <button onClick={() => handleOpenModal(u)} className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-variant rounded-full text-secondary hover:text-on-surface transition-colors shrink-0" title="Modifier">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(u._id)} className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-germany-red rounded-full transition-colors shrink-0" title="Supprimer">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="sticky bottom-0 z-20 p-4 border-t border-surface-variant flex flex-col md:flex-row items-center justify-between gap-4 bg-surface-container-lowest/95 backdrop-blur-md rounded-b-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <span className="text-sm text-secondary font-medium">
                Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredUsers.length)} sur {filteredUsers.length} étudiants
              </span>
              <div className="flex gap-1 overflow-x-auto max-w-full pb-1 md:pb-0">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border border-surface-variant text-secondary hover:bg-surface-variant hover:text-on-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-germany-gold text-white border-germany-gold' : 'border border-surface-variant text-secondary hover:bg-surface-variant hover:text-on-surface'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border border-surface-variant text-secondary hover:bg-surface-variant hover:text-on-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 p-2 text-secondary hover:bg-surface-variant rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingUser ? 'Modifier l\'étudiant' : 'Nouvel étudiant'}</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-Mail</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mot de passe {!editingUser && '*'}</label>
                <div className="relative">
                  <input required={!editingUser} type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full pl-4 pr-12 py-2 rounded-xl bg-surface-container border border-surface-variant" placeholder={editingUser ? "(laisser vide pour conserver)" : ""} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface p-1 rounded-full transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {!editingUser && (
                  <button type="button" onClick={() => setFormData({ ...formData, password: generatePassword() })} className="mt-1 text-xs text-germany-gold hover:underline">
                    Générer un nouveau mot de passe
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Niveau</label>
                <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant">
                  <option value="A1">A1</option><option value="A2">A2</option>
                  <option value="B1">B1</option><option value="B2">B2</option>
                  <option value="C1">C1</option><option value="C2">C2</option>
                  <option value="Tous">Tous</option>
                </select>
              </div>
              {editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-1">Statut du compte</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant">
                    <option value="active">Actif (Validé)</option>
                    <option value="pending">En attente</option>
                    <option value="rejected">Rejeté</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full border-2 transition-all ${formData.gender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">male</span>
                    <span>Masculin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full border-2 transition-all ${formData.gender === 'female' ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">female</span>
                    <span>Féminin</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date de naissance</label>
                <input type="date" value={formData.birthday} onChange={e => setFormData({ ...formData, birthday: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div className="md:col-span-2 border-t border-surface-variant pt-4 mt-2">
                <h3 className="text-lg font-bold mb-4">Frais de scolarité</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Mode de paiement</label>
                    <select value={formData.subscription.paymentType} onChange={e => setFormData({ ...formData, subscription: { ...formData.subscription, paymentType: e.target.value } })} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant">
                      <option value="full">En une fois</option>
                      <option value="twice">En deux fois</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer mt-4">
                      <input type="checkbox" checked={formData.subscription.firstPaymentPaid} onChange={e => setFormData({ ...formData, subscription: { ...formData.subscription, firstPaymentPaid: e.target.checked } })} className="w-5 h-5 rounded accent-germany-gold cursor-pointer" />
                      <span className="text-sm font-medium">{formData.subscription.paymentType === 'full' ? 'Paiement effectué' : '1er Paiement effectué'}</span>
                    </label>
                  </div>
                  {formData.subscription.paymentType === 'twice' && (
                    <div className="flex flex-col justify-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer mt-4">
                        <input type="checkbox" checked={formData.subscription.secondPaymentPaid} onChange={e => setFormData({ ...formData, subscription: { ...formData.subscription, secondPaymentPaid: e.target.checked } })} className="w-5 h-5 rounded accent-germany-gold cursor-pointer" />
                        <span className="text-sm font-medium">2ème Paiement effectué</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2 mt-2">
                <label className="block text-sm font-medium mb-1">Photo (Avatar)</label>
                <div className="flex items-center gap-4">
                  {formData.photo && (
                    <img src={formData.photo} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-surface-variant" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="flex-1 px-4 py-2 rounded-xl bg-surface-container border border-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-germany-gold file:text-white hover:file:bg-yellow-600 transition-all"
                  />
                  {uploadingImage && <span className="material-symbols-outlined animate-spin text-secondary">progress_activity</span>}
                </div>
              </div>

              <div className="md:col-span-2 mt-4">
                <button type="submit" disabled={uploadingImage} className={`w-full bg-germany-gold text-white py-3 rounded-xl font-bold transition-colors ${uploadingImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'}`}>
                  {editingUser ? 'Enregistrer' : 'Créer l\'étudiant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setViewingUser(null)}>
          <div className="bg-surface w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="h-32 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold relative">
              <button onClick={() => setViewingUser(null)} className="absolute top-4 right-4 p-2 text-white/80 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-6 pb-6 relative -mt-16 text-center flex flex-col items-center">
              <div className="relative mb-4">
                {viewingUser.photo ? (
                  <img src={viewingUser.photo} alt={viewingUser.name} className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-lg bg-surface shrink-0" />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-surface shadow-lg bg-surface-variant flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[48px]">person</span>
                  </div>
                )}
                {viewingUser.level && (
                  <div className="absolute bottom-0 right-0 z-10 transform translate-x-2 -translate-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest ${getLevelColor(viewingUser.level).badge} shadow-lg border-[3px] border-surface`}>
                      {viewingUser.level}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-on-surface mb-1">{viewingUser.name}</h2>
              {viewingUser.badgeNumber && (
                <div className="bg-surface-variant px-3 py-1 rounded-lg border border-surface-subtle mb-3 flex items-center gap-2 shadow-inner">
                  <span className="text-secondary text-xs uppercase font-bold tracking-wider">Badge:</span>
                  <span className="font-mono text-lg font-black tracking-widest text-germany-gold">{viewingUser.badgeNumber}</span>
                  <button onClick={() => {
                    navigator.clipboard.writeText(viewingUser.badgeNumber);
                    alert('Numéro de badge copié !');
                  }} className="ml-1 text-secondary hover:text-on-surface transition-colors p-1" title="Copier le badge">
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  </button>
                </div>
              )}
              <p className="text-secondary font-medium mb-4 uppercase tracking-widest text-xs flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">school</span> Étudiant
              </p>

              <div className="w-full bg-surface-container-lowest rounded-2xl p-4 border border-surface-variant space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">mail</span>
                  <div className="min-w-0">
                    <p className="text-xs text-secondary font-semibold uppercase">E-Mail</p>
                    <p className="text-sm font-medium truncate">{viewingUser.email}</p>
                  </div>
                </div>
                {viewingUser.phone && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px]">phone</span>
                    <div>
                      <p className="text-xs text-secondary font-semibold uppercase">Téléphone</p>
                      <p className="text-sm font-medium">{viewingUser.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
                  <div>
                    <p className="text-xs text-secondary font-semibold uppercase">Date de naissance</p>
                    <p className="text-sm font-medium">{viewingUser.birthday ? new Date(viewingUser.birthday).toLocaleDateString('de-DE') : 'Non renseigné'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">wc</span>
                  <div>
                    <p className="text-xs text-secondary font-semibold uppercase">Genre</p>
                    <p className="text-sm font-medium capitalize">{viewingUser.gender === 'male' ? 'Masculin' : 'Féminin'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">payments</span>
                  <div>
                    <p className="text-xs text-secondary font-semibold uppercase mb-1.5">Frais de scolarité</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-md text-xs font-black bg-surface-variant text-on-surface-variant border border-surface-subtle">
                        {viewingUser.subscription?.paymentType === 'full' ? '1x (En une fois)' : '2x (En deux fois)'}
                      </span>
                      {viewingUser.subscription?.paymentType === 'full' ? (
                        <div className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 border ${viewingUser.subscription?.firstPaymentPaid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                          <span className="material-symbols-outlined text-[14px]">{viewingUser.subscription?.firstPaymentPaid ? 'check_circle' : 'cancel'}</span>
                          Payé
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 border ${viewingUser.subscription?.firstPaymentPaid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                            <span className="material-symbols-outlined text-[14px]">{viewingUser.subscription?.firstPaymentPaid ? 'check_circle' : 'cancel'}</span>
                            1er
                          </div>
                          <div className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 border ${viewingUser.subscription?.secondPaymentPaid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                            <span className="material-symbols-outlined text-[14px]">{viewingUser.subscription?.secondPaymentPaid ? 'check_circle' : 'cancel'}</span>
                            2ème
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {viewingUser.plainPassword && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px]">key</span>
                    <div className="min-w-0">
                      <p className="text-xs text-secondary font-semibold uppercase">Mot de passe</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate bg-surface px-2 py-1 rounded border border-surface-variant">{showPassword ? viewingUser.plainPassword : '••••••••'}</p>
                        <button onClick={() => setShowPassword(!showPassword)} className="text-secondary hover:text-on-surface p-1 rounded-full transition-colors flex items-center justify-center">
                          <span className="material-symbols-outlined text-[16px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 w-full">
                {viewingUser.plainPassword && (
                  <button onClick={() => {
                    navigator.clipboard.writeText(`Email: ${viewingUser.email}\nMot de passe: ${viewingUser.plainPassword}`);
                    alert('Identifiants copiés !');
                  }} className="w-full bg-germany-gold text-white py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 hover:bg-yellow-600">
                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    Copier les identifiants
                  </button>
                )}
                <button onClick={() => { setViewingUser(null); handleOpenModal(viewingUser); }} className="w-full bg-surface-container hover:bg-surface-variant text-on-surface py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

