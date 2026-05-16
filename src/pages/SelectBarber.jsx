import { Scissors } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function SelectBarber() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container" style={{padding: '4rem 1.5rem'}}>
        <div style={{marginBottom: '4rem'}}>
          <h2 className="text-accent" style={{fontSize: '4rem', lineHeight: 1, marginBottom: '1rem'}}>ESCOLHA<br/><span style={{color: 'white'}}>SEU MESTRE</span></h2>
          <p style={{opacity: 0.7, maxWidth: '600px', fontSize: '1.25rem'}}>Nossa equipe é formada pela elite do hip-hop grooming. Selecione o profissional para o seu agendamento.</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
          {[
            { name: "DJ CUTZ", specialty: "Degradê & Freestyle", exp: "8 Anos" },
            { name: "MC BARBER", specialty: "Barba & Acabamento", exp: "5 Anos" },
            { name: "RHYME MASTER", specialty: "Combo Elite VIP", exp: "10 Anos" }
          ].map((barber, i) => (
            <div key={i} className="card service-card" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
              <div style={{aspectRatio: '1/1', backgroundColor: 'var(--background)', border: '2px solid white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Scissors size={64} className="text-accent" />
              </div>
              <div style={{flex: 1}}>
                <h3 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{barber.name}</h3>
                <p className="text-accent mono" style={{marginBottom: '1rem', fontWeight: 'bold'}}>{barber.specialty}</p>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', opacity: 0.7}}>
                  <span className="mono" style={{fontSize: '0.875rem'}}>EXP: {barber.exp}</span>
                  <span className="mono" style={{fontSize: '0.875rem'}}>NOTA: 5.0</span>
                </div>
              </div>
              <button onClick={() => navigate('/schedule')} className="btn-primary" style={{width: '100%'}}>SELECIONAR</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
