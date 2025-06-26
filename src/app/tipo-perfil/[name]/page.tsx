'use client';

import { useParams } from 'next/navigation';

export default function TipoPerfilPage() {
  const params = useParams();
  const name = params?.name as string;

  return (
    <div className="container">
      <h1>Perfil do Viajante: {name}</h1>
      {/* Aqui vai o conteúdo da página */}
    </div>
  );
} 