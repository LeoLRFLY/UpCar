"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  if (loading || !user) return <div className="min-h-screen bg-upcar-darker flex items-center justify-center"><div className="w-8 h-8 border-2 border-upcar-red border-t-transparent rounded-full animate-spin" /></div>;
  const firstName = user.displayName?.split(" ")[0] || "Piloto";
  return (
    <div className="min-h-screen bg-upcar-darker">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.06)",background:"#0d0d0d"}}>
        <Image src="/logo.png" alt="UpCar" width={120} height={40} className="h-9 w-auto" />
        <div className="flex items-center gap-4">
          {user.photoURL && <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />}
          <span className="text-sm hidden md:block" style={{color:"rgba(255,255,255,0.7)"}}>{user.displayName}</span>
          <button onClick={logout} className="text-xs px-4 py-2 rounded-full border" style={{border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"}}>Sair</button>
        </div>
      </nav>
      <div className="px-6 md:px-12 py-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-upcar-red mb-2">Dashboard</p>
        <h1 className="font-display text-5xl tracking-wider mb-2">OLA, {firstName.toUpperCase()}! ??</h1>
        <p className="text-sm mb-10" style={{color:"rgba(255,255,255,0.4)"}}>Bem-vindo ao UpCar. Seu ecossistema começa aqui.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[{icon:"??",label:"Meus Veículos",value:"0"},{icon:"??",label:"Registros",value:"0"},{icon:"??",label:"Manutenções",value:"0"}].map((c,i)=>(
            <div key={i} className="rounded-2xl p-6 flex flex-col gap-3" style={{background:"#111111",border:"1px solid rgba(255,255,255,0.07)"}}>
              <span className="text-3xl">{c.icon}</span>
              <p className="text-xs tracking-widest uppercase" style={{color:"rgba(255,255,255,0.4)"}}>{c.label}</p>
              <p className="font-display text-4xl">{c.value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[{icon:"??",title:"MEUS VEÍCULOS",desc:"Cadastre seu veículo e construa seu histórico verificável."},{icon:"??",title:"CADERNETA DIGITAL",desc:"Registre abastecimentos e manutenções em segundos."},{icon:"??",title:"OFICINAS",desc:"Encontre oficinas credenciadas perto de você."},{icon:"??",title:"LOJA",desc:"Peças e acessórios dos melhores fornecedores."}].map((item,i)=>(
            <div key={i} className="rounded-2xl p-8 relative overflow-hidden group transition-all hover:-translate-y-1" style={{background:"#111111",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-upcar-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="font-display text-xl tracking-wider mb-2">{item.title}</h3>
              <p className="text-sm mb-4" style={{color:"rgba(255,255,255,0.4)"}}>{item.desc}</p>
              <span className="text-xs font-semibold text-upcar-red">Em breve ??</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{background:"linear-gradient(135deg,#1a0800,#0d0d0d)",border:"1px solid rgba(204,0,0,0.2)"}}>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-upcar-red mb-1">Plano Atual</p>
            <h3 className="font-display text-2xl tracking-wider">FREE</h3>
            <p className="text-sm mt-1" style={{color:"rgba(255,255,255,0.4)"}}>Faça upgrade para desbloquear alertas, histórico completo e QR verificado.</p>
          </div>
          <button className="bg-upcar-red text-white px-8 py-3 rounded-full font-bold text-sm" style={{boxShadow:"0 4px 20px rgba(204,0,0,0.3)"}}>Fazer Upgrade</button>
        </div>
      </div>
    </div>
  );
}
