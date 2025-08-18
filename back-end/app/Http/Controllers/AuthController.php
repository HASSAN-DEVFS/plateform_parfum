<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $validated = $request->validate([
        'nom' => 'required|string|min:4',
        'prenom' => 'required|string|min:4',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed', // ok, car React envoie password_confirmation
    ]);

    // Hash du mot de passe avant la création
    $validated['password'] = bcrypt($validated['password']);

    $user = User::create([
        'nom' => $validated['nom'],
        'prenom' => $validated['prenom'],
        'email' => $validated['email'],
        'password' => $validated['password'],
    ]);

    return response()->json([
        'message' => 'Inscription réussie',
        'user' => $user,
    ], 201);
}

}



