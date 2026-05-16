import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

const calendarDays = Array.from({ length: 21 }, (_, index) => index + 1);

const services = [
  { id: 'cabelo', label: 'Cabelo', icon: 'content_cut' },
  { id: 'barba', label: 'Barba', icon: 'face' },
  { id: 'quimica', label: 'Química', icon: 'science' },
  { id: 'estetica', label: 'Estética', icon: 'spa' },
];

const barbers = [
  {
    id: 'rafa',
    name: 'Rafa',
    role: 'Mestre Barbeiro',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2jvo9CWBkODprTAcIGoEBBPNItG_Kyz-emwqLT-JqT9QwWa4d38gKcOvh-rEiAidoZ9V72LEXLeq-VCPCu57Kb7h5P3SOb5uvYSHmmcSbMcRaXYUbseCB_eWOLADk9bD_xkYS-03U1XeIDbsKrK6zFnVNQULG9bAUdrVNlGjaqkikVYYkhAS9BkPvcIeHOT5gOkGdMwLRblWE6yR1JG7UuVCrnSgZd1QBQ8VdDVsP1z35sq8CnQzyIUrreeKRgWo8PALg7PHJBa4',
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Especialista em Degradê',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAS6UiJfiNOMTQ_DxaWxTHX2vaO8guVlGdlnoMFJ5SqsrhWmpwgNrpb3wgs3zD2VOcWbQFPQ3pEs9Tf4NXgQMWtrHx2Ji3jpe7mwD_zXtH-f-l-Q0t-IhepB5xV2z86wwGYADYquI_BHvHpP9Kf5pnjCzYkFAn49kyNk7t8OMAin9x9WUPUK43rA4F5utqYBx1QYlEo6f7wpXP9M5u1jQZ3Dl6E6mBhdRDHGWkY1tiG_PvkVzyBcFi2F9_QNYR86neSQLQ_nM3l23k',
  },
  {
    id: 'dani',
    name: 'Dani',
    role: 'Colorista',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxFX4dkwrhCE2lp3qBCHEaPO4SdbCE55GaGnjJ0SR5HYf3ZnVjIAs1v2XjnaRXaHYV4FJOH0-KMdro0wtHCAjLn2TCsgdsW80h3xtgfTSOWMQ0BH0VC2-sFxCyAhpieYu4mILHWc6_FJPkdb6nNsYDV_b8punO9EhiIsGrJwsd-CQVnuFAEbn1Qo9QKxDbFStQO2UHh0ElDK5WnkbbS9WOqcJKt47eMFcpaXpQtHbGm1_zssc-K9NLScj3THWLAxB_fiMJFtTfoOE',
  },
  {
    id: 'tago',
    name: 'Tago',
    role: 'Especialista em Barba',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQb0HWAGAsblDAqm7TAUO_l9w7j_2ju7Ph0FyxTsId3VDrWa0UvU-nZqmibzkpvKWsE0eE_H6dXj9cMH81HGNgdvzGdejOvoMnCNsZv-cojvmD-qOGVufvn1n6hS17lqHZcFhWl_91bnfYMI1UKkInRmOqTTBscX4tQuT77km3OLCLy0vUfwS1wx9gDr3LkwIU3N0l_qPLcwNc1GFATKvOkJ9X7WzSy3Cl76ox4h80Kert4lXn8gcnb1BuKe3-OYhegcIia6iTro',
  },
];

export default function Schedule() {
  const { user, profile } = useAuth();
  const [selectedDay, setSelectedDay] = useState(13);
  const [selectedService, setSelectedService] = useState('barba');
  const [selectedBarber, setSelectedBarber] = useState('leo');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const selectedServiceData = services.find((service) => service.id === selectedService);
  const selectedBarberData = barbers.find((barber) => barber.id === selectedBarber);
  const customerName = profile?.displayName || user.displayName || user.email || 'Cliente';

  const handleConfirm = async () => {
    if (!selectedDay || !selectedServiceData || !selectedBarberData) {
      setMessage('Selecione data, serviço e barbeiro antes de confirmar.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'appointments'), {
        date: `2023-10-${String(selectedDay).padStart(2, '0')}`,
        day: selectedDay,
        month: 'Outubro 2023',
        serviceId: selectedServiceData.id,
        service: selectedServiceData.label,
        barberId: selectedBarberData.id,
        barber: selectedBarberData.name,
        userId: user.uid,
        name: customerName,
        status: 'pending',
        source: 'schedule-page',
        createdAt: serverTimestamp(),
      });

      setMessage('Agendamento solicitado com sucesso!');
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      setMessage('Erro ao confirmar agendamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule-wrapper text-on-background font-body-md min-h-screen flex flex-col pb-36 md:pb-28">
      <header className="flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop h-16 w-full fixed top-0 z-50 bg-surface/95 backdrop-blur-md border-b-2 border-surface-variant dark:border-surface-variant">
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                person
              </span>
            </div>
          </Link>
          <h1 className="font-display-lg-mobile text-headline-md-mobile font-black text-primary-fixed-dim dark:text-primary-fixed-dim uppercase tracking-tighter">
            Barbearia do Poçam
          </h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-primary-fixed-dim dark:text-primary-fixed-dim hover:bg-surface-container-high transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-grow pt-24 px-container-margin-mobile md:px-container-margin-desktop max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="font-headline-lg text-headline-lg text-primary-fixed-dim mb-2 uppercase tracking-wide">Selecionar data</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Escolha uma data disponível para o seu agendamento.</p>
        </div>

        <section className="bg-[#181818] rounded-xl border border-surface-variant p-6 mb-section-gap relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-fixed-dim"></div>
          <div className="flex justify-between items-center mb-6">
            <button className="text-on-surface hover:text-primary-fixed-dim transition-colors cursor-pointer" aria-label="Mês anterior">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="font-headline-md text-headline-md text-on-surface">Outubro 2023</h3>
            <button className="text-on-surface hover:text-primary-fixed-dim transition-colors cursor-pointer" aria-label="Próximo mês">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((weekday) => (
              <div key={weekday} className="font-label-md text-label-md text-on-surface-variant uppercase">
                {weekday}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {calendarDays.map((day) => {
              const isSelected = selectedDay === day;
              const isDisabled = day === 1;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square flex items-center justify-center rounded-lg transition-colors ${
                    isDisabled
                      ? 'text-on-surface-variant opacity-50 cursor-not-allowed'
                      : isSelected
                        ? 'bg-primary-fixed-dim text-[#0a0a0a] font-bold hard-shadow cursor-pointer'
                        : 'text-on-surface hover:bg-surface-container-high cursor-pointer'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </section>

        <div className="relative mt-section-gap mb-16 border-t border-surface-variant pt-12">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-surface-container px-4 py-1 rounded-full text-on-surface-variant font-label-md text-label-md uppercase tracking-widest border border-surface-variant whitespace-nowrap">
            Passo 2 e 3 seleção
          </div>

          <div className="mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary-fixed-dim mb-6 uppercase tracking-wide">Tipo de serviço</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => {
                const isSelected = selectedService === service.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`bg-[#181818] rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors group aspect-square cursor-pointer relative ${
                      isSelected ? 'border-2 border-primary-fixed-dim hard-shadow' : 'border border-surface-variant hover:border-primary-fixed-dim'
                    }`}
                  >
                    {isSelected && <div className="absolute top-2 right-2 w-3 h-3 bg-primary-fixed-dim rounded-full"></div>}
                    <span
                      className={`material-symbols-outlined text-4xl transition-colors ${
                        isSelected ? 'text-primary-fixed-dim' : 'text-on-surface-variant group-hover:text-primary-fixed-dim'
                      }`}
                    >
                      {service.icon}
                    </span>
                    <span className="font-headline-md text-headline-md text-on-surface uppercase text-sm">{service.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary-fixed-dim mb-6 uppercase tracking-wide">Selecionar barbeiro</h2>
            <div className="grid grid-cols-2 gap-4">
              {barbers.map((barber) => {
                const isSelected = selectedBarber === barber.id;

                return (
                  <button
                    key={barber.id}
                    type="button"
                    onClick={() => setSelectedBarber(barber.id)}
                    className={`bg-[#181818] rounded-xl overflow-hidden group cursor-pointer transition-colors relative h-64 text-left ${
                      isSelected ? 'border-2 border-primary-fixed-dim hard-shadow' : 'border border-surface-variant hover:border-primary-fixed-dim'
                    }`}
                  >
                    {isSelected && <div className="absolute top-2 right-2 w-3 h-3 bg-primary-fixed-dim rounded-full z-10"></div>}
                    <img
                      alt={`Barbeiro ${barber.name}`}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isSelected ? '' : 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
                      }`}
                      src={barber.image}
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 gradient-overlay">
                      <h4 className="font-headline-md text-headline-md text-on-surface uppercase">{barber.name}</h4>
                      <p className="font-caption text-caption text-primary-fixed-dim">{barber.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {message && (
              <p className="mt-6 text-center font-body-md text-body-md text-primary-fixed-dim" role="status">
                {message}
              </p>
            )}

            <div className="mt-8 flex justify-end pb-10 md:pb-0">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading}
                className="bg-primary-fixed-dim text-[#0A0A0A] font-headline-md text-headline-md uppercase px-8 py-3 rounded-DEFAULT hard-shadow-hover transition-all w-full md:w-auto cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Confirmando...' : 'Confirmar agendamento'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container/98 border-t-2 border-surface-variant rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        <Link to="/home" className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out" style={{ textDecoration: 'none' }}>
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-label-md text-label-md uppercase tracking-widest">Início</span>
        </Link>
        <Link to="/schedule" className="flex flex-col items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant/20 rounded-xl px-4 py-1 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out" style={{ textDecoration: 'none' }}>
          <span className="material-symbols-outlined mb-1">calendar_month</span>
          <span className="font-label-md text-label-md uppercase tracking-widest">Agenda</span>
        </Link>
        <Link to="/plans" className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out" style={{ textDecoration: 'none' }}>
          <span className="material-symbols-outlined mb-1">loyalty</span>
          <span className="font-label-md text-label-md uppercase tracking-widest">Planos</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out" style={{ textDecoration: 'none' }}>
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-label-md text-label-md uppercase tracking-widest">Perfil</span>
        </Link>
      </nav>
    </div>
  );
}
