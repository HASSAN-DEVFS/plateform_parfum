<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nom'      => 'required|string|min:4',
            'prenom'   => 'required|string|min:4',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $user = User::create([
            'nom'      => $validated['nom'],
            'prenom'   => $validated['prenom'],
            'email'    => $validated['email'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'message' => 'Inscription réussie',
            'user'    => $user,
        ], 201);
    }

   public function redirectToGoogle()
{
    return Socialite::driver('google')->redirect();
}

public function handleGoogleCallback()
{
    try {
        // Ajouter stateless() pour React
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Crée ou récupère l'utilisateur
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'nom'      => $googleUser->user['family_name'] ?? $googleUser->getName(),
                'prenom'   => $googleUser->user['given_name'] ?? '',
                'password' => bcrypt(str()->random(32)),
            ]
        );

        // Génère le token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Redirection vers React avec token
        return redirect("http://localhost:5173/connexion?token=$token");


    } catch (\Throwable $e) {
        // Debug : renvoyer le message réel
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}
