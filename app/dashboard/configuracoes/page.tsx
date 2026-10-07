export default function Configuracoes() {
  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Configurações</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>Gerencie seus dados pessoais, endereço e preferências.</p>

      <div className="card">
        <h2 style={{ fontSize: 18, marginBottom: 24 }}>Meus Dados</h2>
        <form>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label className="label">Nome Completo</label>
              <input type="text" className="input" defaultValue="Beatriz Melo" />
            </div>
            <div className="form-group">
              <label className="label">E-mail</label>
              <input type="email" className="input" defaultValue="beatriz@example.com" />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="label">Endereço de Correspondência</label>
              <input type="text" className="input" placeholder="Rua, Número, Bairro, Cidade" />
            </div>
          </div>
          <button type="button" className="btn" style={{ marginTop: 16 }}>Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
