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
          <button onClick={logout} className="text-xs px-4 py-2 rounded-full" style={{border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"}}>Sair</button>
        </div>
      </nav>
      <div className="px-6 md:px-12 py-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-upcar-red mb-2">Dashboard</p>
        <h1 className="font-display text-5xl tracking-wider mb-2">OLA, {firstName.toUpperCase()}!</h1>
        <p className="text-sm mb-10" style={{color:"rgba(255,255,255,0.4)"}}>Bem-vindo ao UpCar. Seu ecossistema comeca aqui.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[{icon:"car",label:"Meus Veiculos",value:"0"},{icon:"book",label:"Registros",value:"0"},{icon:"wrench",label:"Manutencoes",value:"0"}].map((c,i)=>(
            <div key={i} className="rounded-2xl p-6 flex flex-col gap-3" style={{background:"#111111",border:"1px solid rgba(255,255,255,0.07)"}}>
              <p className="text-xs tracking-widest uppercase" style={{color:"rgba(255,255,255,0.4)"}}>{c.label}</p>
              <p className="font-display text-4xl">{c.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{background:"linear-gradient(135deg,#1a0800,#0d0d0d)",border:"1px solid rgba(204,0,0,0.2)"}}>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-upcar-red mb-1">Plano Atual</p>
            <h3 className="font-display text-2xl tracking-wider">FREE</h3>
            <p className="text-sm mt-1" style={{color:"rgba(255,255,255,0.4)"}}>Faca upgrade para desbloquear alertas e historico completo.</p>
          </div>
          <button className="bg-upcar-red text-white px-8 py-3 rounded-full font-bold text-sm">Fazer Upgrade</button>
        </div>
      </div>
    </div>
  );
}