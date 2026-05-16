# Estrutura do Firestore

Este projeto usa o Firebase `barbearia-pocam` e o banco Firestore padrão.

## Coleções

- `services`: catálogo público dos serviços exibidos no agendamento.
- `barbers`: catálogo público dos barbeiros.
- `plans`: planos exibidos na tela de assinatura.
- `appointments`: agendamentos criados pelo site.
- `users`: perfis dos clientes quando o login real for conectado.

## Documento de agendamento

Exemplo salvo em `appointments`:

```json
{
  "date": "2023-10-13",
  "day": 13,
  "month": "Outubro 2023",
  "serviceId": "barba",
  "service": "Barba",
  "barberId": "leo",
  "barber": "Leo",
  "status": "pending",
  "source": "schedule-page",
  "createdAt": "serverTimestamp"
}
```

## Dados iniciais

Use `firestore.seed.json` como referência para criar os documentos iniciais no console do Firebase:

- `services/cabelo`, `services/barba`, `services/quimica`, `services/estetica`
- `barbers/rafa`, `barbers/leo`, `barbers/dani`, `barbers/tago`
- `plans/silver`, `plans/gold`, `plans/platinum`

## Deploy das regras e índices

Depois de fazer login no Firebase CLI:

```bash
firebase deploy --only firestore
```

As regras permitem leitura pública de catálogo e criação controlada de agendamentos. Escrita administrativa em catálogo exige um usuário em `users/{uid}` com `"role": "admin"`.

## Fotos de perfil

O app usa Firebase Storage para salvar fotos em:

```text
profilePhotos/{uid}/profile-{timestamp}.{extensao}
```

Antes de publicar `storage.rules`, inicialize o Storage no Console do Firebase:

1. Abra `https://console.firebase.google.com/project/barbearia-pocam/storage`
2. Clique em `Get Started`
3. Crie o bucket padrão
4. Rode:

```bash
firebase deploy --only storage
```
