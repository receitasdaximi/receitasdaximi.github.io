import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/public/receitas_logo.jpeg";

export default function Home() {

  const router = useRouter();

  return (
    <div className="d-flex flex-column indexPage">
      <Image src={Logo} alt="Logo"></Image>
        <button 
          className="btn btn-success indexButton m-2 mt-4" 
          onClick={() => router.push('/recipes')}>Lista de Receitas</button>
        <button 
          className="btn btn-success indexButton m-2"
          onClick={() => router.push('/new')}>Nova Receita</button>
    </div>
  );
}
