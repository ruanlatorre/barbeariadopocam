import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Corte na Régua',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({ name: '', phone: '', service: 'Corte na Régua', date: '', time: '' });
    } catch (error) {
      console.error("Erro ao agendar:", error);
      alert("Erro ao realizar agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card form-success">
        <CheckCircle size={64} className="text-accent form-success-icon" />
        <h3 className="form-success-title">AGENDADO!</h3>
        <p className="form-success-desc">Recebemos seu pedido. Entraremos em contato em breve para confirmar.</p>
        <button onClick={() => setSuccess(false)} className="btn-secondary">Novo Agendamento</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card form-card">
      <h3 className="text-accent form-title">RESERVE SEU HORÁRIO</h3>
      
      <div className="form-group">
        <label className="mono form-label">
          <User size={14} /> Nome Completo
        </label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="mono form-label">
          <Phone size={14} /> Telefone / WhatsApp
        </label>
        <input 
          required
          type="tel" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="mono form-label">
            <Calendar size={14} /> Data
          </label>
          <input 
            required
            type="date" 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="mono form-label">
            <Clock size={14} /> Horário
          </label>
          <input 
            required
            type="time" 
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="mono form-label">Serviço</label>
        <select 
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
          className="form-input"
        >
          <option>Corte na Régua</option>
          <option>Barba de Respeito</option>
          <option>Combo Elite</option>
          <option>Hidratação</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary form-submit"
      >
        {loading ? 'PROCESSANDO...' : 'CONFIRMAR AGENDAMENTO'}
      </button>
    </form>
  );
}
