import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from '../store/adminUsersSlice';

export default function AdminManagement() {
  const { user } = useSelector((state) => state.auth);
  const { users: allUsers, status } = useSelector((state) => state.adminUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const users = allUsers.filter(u => u.role === 'admin');
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
    role: 'admin', // hardcoded
    phone: '',
    gender: 'female',
    birthday: '',
    photo: '',
  });

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleOpenModal = (u = null) => {
    if (u) {
      setEditingUser(u);
      setFormData({
        name: u.name || '',
        email: u.email || '',
        password: u.plainPassword || '',
        role: 'admin',
        phone: u.phone || '',
        gender: u.gender || 'female',
        birthday: u.birthday ? new Date(u.birthday).toISOString().split('T')[0] : '',
        photo: u.photo || '',
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '', email: '', password: '', role: 'admin', phone: '', gender: 'female', birthday: '', photo: '',
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
      const dataToSubmit = { ...formData, level: 'Alle' };
      if (editingUser) {
        await dispatch(updateAdminUser({ id: editingUser._id, userData: dataToSubmit })).unwrap();
      } else {
        await dispatch(createAdminUser(dataToSubmit)).unwrap();
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert(err || 'Une erreur s\'est produite.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet administrateur ?')) return;
    try {
      await dispatch(deleteAdminUser(id)).unwrap();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression de l\'administrateur.');
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
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Gestion des administrateurs</h2>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-germany-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors shadow-lg font-bold w-full md:w-auto shrink-0"
        >
          <span className="material-symbols-outlined">person_add</span>
          Nouvel administrateur
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
              className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl border border-surface-variant focus:outline-none focus:border-germany-black focus:ring-1 focus:ring-germany-black transition-all text-sm font-medium"
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
                <th className="p-4 font-medium">E-mail</th>
                <th className="p-4 font-medium">Téléphone</th>
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
                      <p>Aucun administrateur trouvé.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.map(u => (
                <tr key={u._id} className="border-b border-surface-variant last:border-0 hover:bg-surface-container/50 transition-colors">
                  <td className="p-4 font-bold text-on-surface cursor-pointer group" onClick={() => setViewingUser(u)}>
                    <div className="flex items-center gap-3">
                      {u.photo ? (
                        <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-surface-variant shrink-0 group-hover:ring-2 ring-germany-black transition-all" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-secondary border border-surface-variant shrink-0 group-hover:ring-2 ring-germany-black transition-all">
                          <span className="material-symbols-outlined text-[20px]">person</span>
                        </div>
                      )}
                      <span className="group-hover:text-germany-black transition-colors">{u.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-secondary">{u.email}</td>
                  <td className="p-4 text-secondary">{u.phone || '-'}</td>
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
            <h2 className="text-2xl font-bold mb-6">{editingUser ? 'Modifier l\'administrateur' : 'Nouvel administrateur'}</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-surface-container border border-surface-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
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
              <div className="md:col-span-2">
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
                    className="flex-1 px-4 py-2 rounded-xl bg-surface-container border border-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-germany-black file:text-white hover:file:bg-gray-800 transition-all" 
                  />
                  {uploadingImage && <span className="material-symbols-outlined animate-spin text-secondary">progress_activity</span>}
                </div>
              </div>
              
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full bg-germany-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                  {editingUser ? 'Enregistrer' : 'Créer l\'administrateur'}
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
              {viewingUser.photo ? (
                <img src={viewingUser.photo} alt={viewingUser.name} className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-lg bg-surface shrink-0 mb-4" />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-surface shadow-lg bg-surface-variant flex items-center justify-center text-secondary shrink-0 mb-4">
                  <span className="material-symbols-outlined text-[48px]">person</span>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-on-surface mb-1">{viewingUser.name}</h2>
              <p className="text-secondary font-medium mb-4 uppercase tracking-widest text-xs flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span> Admin
              </p>
              
              <div className="w-full bg-surface-container-lowest rounded-2xl p-4 border border-surface-variant space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">mail</span>
                  <div className="min-w-0">
                    <p className="text-xs text-secondary font-semibold uppercase">E-mail</p>
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
              </div>
              
              <div className="mt-6 flex gap-3 w-full">
                <button onClick={() => { setViewingUser(null); handleOpenModal(viewingUser); }} className="flex-1 bg-surface-container hover:bg-surface-variant text-on-surface py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
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
