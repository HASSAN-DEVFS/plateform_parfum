import React, { useEffect } from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bgImage from '../../assets/parfum_background.webp'; 
import { toast } from "sonner"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Schema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type FormData = z.infer<typeof Schema>;

const Connexion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });



// ✅ Lecture du token depuis l'URL (Google OAuth)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      toast.success("Connexion Google réussie !");
      // Redirection vers dashboard
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);





  // Connexion avec email + mot de passe
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", data);
      localStorage.setItem("token", response.data.token);
      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Email ou mot de passe incorrect");
    }
  };




  // Connexion via Google
  const loginWithGoogle = () => {
    window.location.assign("http://127.0.0.1:8000/auth/google");
  };

  // Connexion via Facebook
  const loginWithFacebook = () => {
    window.location.assign("http://127.0.0.1:8000/auth/facebook");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Se connecter</h2>

        <div className="space-y-4">
          {/* Champ Email */}
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all duration-200 
                       placeholder-gray-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Champ Mot de passe */}
          <input
            type="password"
            {...register("password")}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all duration-200 
                       placeholder-gray-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Bouton Connexion */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                       py-3 px-4 rounded-xl transition duration-300"
          >
            Se connecter
          </button>
        </div>

        {/* Boutons OAuth */}
        <div className="mt-6 flex flex-col space-y-3">
          {/* Connexion Google */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 border 
                       border-gray-300 rounded-xl px-4 py-3 text-gray-700 
                       font-medium shadow-sm hover:bg-gray-50 transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continuer avec Google
          </button>

          {/* Connexion Facebook */}
          <button
            type="button"
            onClick={loginWithFacebook}
            className="w-full flex items-center justify-center gap-3 border 
                       border-gray-300 rounded-xl px-4 py-3 text-gray-700 
                       font-medium shadow-sm hover:bg-gray-50 transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            Continuer avec Facebook
          </button>
        </div>

        {/* Lien vers inscription */}
        <div className="text-center mt-4">
          <Link
            to="/inscription"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-300 ease-in-out"
          >
            Tu n'as pas un compte ?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Connexion
