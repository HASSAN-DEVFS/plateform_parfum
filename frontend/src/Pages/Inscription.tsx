import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bgImage from '../assets/parfum_background.webp'; 

// ✅ Schéma de validation
const Schema = z.object({
  nom: z.string().min(4, "Le nom doit contenir au moins 4 caractères"),
  prenom: z.string().min(4, "Le prénom doit contenir au moins 4 caractères"),
  email: z.string().email("L'email n'est pas valide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmePassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type FormData = z.infer<typeof Schema>;

const Inscription: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Données envoyées:", data);
  };

  return (
    
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
  backgroundImage: `url(${bgImage})`,
}} 
    >
      {/* 🧾 Formulaire avec fond blanc */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Créer un compte</h2>

        <div className="space-y-4">
          <input
            type="text"
            {...register("nom")}
            placeholder="Nom"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}

          <input
            type="text"
            {...register("prenom")}
            placeholder="Prénom"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}

          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password")}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input
            type="password"
            {...register("confirmePassword")}
            placeholder="Confirmer le mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          {errors.confirmePassword && (
            <p className="text-red-500 text-sm">{errors.confirmePassword.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
