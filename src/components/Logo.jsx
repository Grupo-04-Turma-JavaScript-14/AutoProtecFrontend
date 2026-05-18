import { Shield } from "lucide-react";
import logo from "../../public/images/content3.png";

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/*  <Shield className="h-9 w-9 text-primary" strokeWidth={2} />
        <Shield
          className="h-9 w-9 text-accent absolute top-0 left-0 mix-blend-screen opacity-60 -translate-x-0.5"
          strokeWidth={2}
        /> */}
        <img src={logo} alt="" width={80} height={80} />
      </div>
      <div className="leading-none">
        <div className="font-extrabold text-lg tracking-tight">
          <span className="text-blue-600">Auto</span>
          <span className="text-red-500">Protec</span>
        </div>
        <div className="text-[9px] tracking-[0.3em] text-muted font-semibold mt-0.5">
          SEGUROS
        </div>
      </div>
    </div>
  );
}
