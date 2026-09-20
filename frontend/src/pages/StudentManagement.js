import React, { useState, useEffect } from 'react';
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
        }
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '', email: '', password: generatePassword(), role: 'student', level: 'A1', phone: '', gender: 'female', birthday: '', photo: '',
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

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u._id && u._id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 bg-surface hover:bg-surface-variant rounded-full text-secondary hover:text-on-surface transition-colors flex items-center justify-center shadow-sm border border-surface-variant">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Gestion des étudiants</h2>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-germany-gold text-white px-4 py-2.5 rounded-xl hover:bg-yellow-600 flex items-center justify-center gap-2 transition-colors shadow-lg font-bold w-full md:w-auto shrink-0"
        >
          <span className="material-symbols-outlined">person_add</span>
          Nouvel étudiant
        </button>
      </div>

      {error && <div className="text-germany-red mb-4">{error}</div>}

      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-surface-variant flex items-center bg-surface-container/30">
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
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
                <tr><td colSpan="4" className="p-4 text-center">Chargement...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                      <p>Aucun étudiant trouvé.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.map(u => (
                <tr key={u._id} className="border-b border-surface-variant last:border-0 hover:bg-surface-container/50 transition-colors">
                  <td className="p-4 font-bold text-on-surface cursor-pointer group" onClick={() => setViewingUser(u)}>
                    <div className="flex items-center gap-3">
                      {u.photo ? (
                        <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-surface-variant shrink-0 group-hover:ring-2 ring-germany-gold transition-all" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-secondary border border-surface-variant shrink-0 group-hover:ring-2 ring-germany-gold transition-all">
                          <span className="material-symbols-outlined text-[20px]">person</span>
                        </div>
                      )}
                      <span className="group-hover:text-germany-gold transition-colors">{u.name}</span>
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
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleOpenModal(u)} className="p-2 bg-surface-container hover:bg-surface-variant rounded-lg text-secondary hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => handleDelete(u._id)} className="p-2 bg-red-50 hover:bg-red-100 text-germany-red rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-Mail</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mot de passe {!editingUser && '*'}</label>
                <div className="relative">
                  <input required={!editingUser} type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-4 pr-12 py-2 rounded-xl bg-surface-container border border-surface-variant" placeholder={editingUser ? "(laisser vide pour conserver)" : ""} />
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
                  <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} className="mt-1 text-xs text-germany-gold hover:underline">
                    Générer un nouveau mot de passe
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Niveau</label>
                <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant">
                  <option value="A1">A1</option><option value="A2">A2</option>
                  <option value="B1">B1</option><option value="B2">B2</option>
                  <option value="C1">C1</option><option value="C2">C2</option>
                  <option value="Tous">Tous</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, gender: 'male'})}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full border-2 transition-all ${formData.gender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">male</span>
                    <span>Masculin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, gender: 'female'})}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full border-2 transition-all ${formData.gender === 'female' ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">female</span>
                    <span>Féminin</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date de naissance</label>
                <input type="date" value={formData.birthday} onChange={e => setFormData({...formData, birthday: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div className="md:col-span-2 border-t border-surface-variant pt-4 mt-2">
                <h3 className="text-lg font-bold mb-4">Frais de scolarité</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Mode de paiement</label>
                    <select value={formData.subscription.paymentType} onChange={e => setFormData({...formData, subscription: { ...formData.subscription, paymentType: e.target.value }})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant">
                      <option value="full">En une fois</option>
                      <option value="twice">En deux fois</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer mt-4">
                      <input type="checkbox" checked={formData.subscription.firstPaymentPaid} onChange={e => setFormData({...formData, subscription: { ...formData.subscription, firstPaymentPaid: e.target.checked }})} className="w-5 h-5 rounded accent-germany-gold cursor-pointer" />
                      <span className="text-sm font-medium">{formData.subscription.paymentType === 'full' ? 'Paiement effectué' : '1er Paiement effectué'}</span>
                    </label>
                  </div>
                  {formData.subscription.paymentType === 'twice' && (
                    <div className="flex flex-col justify-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer mt-4">
                        <input type="checkbox" checked={formData.subscription.secondPaymentPaid} onChange={e => setFormData({...formData, subscription: { ...formData.subscription, secondPaymentPaid: e.target.checked }})} className="w-5 h-5 rounded accent-germany-gold cursor-pointer" />
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
                <button type="submit" className="w-full bg-germany-gold text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors">
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
    </main>
  );
}
