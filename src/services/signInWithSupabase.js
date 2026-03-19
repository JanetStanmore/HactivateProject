import { supabase } from "../config/supabase.config";

export async function getUserDataSupabase(userId) {
  const { data, error } = await supabase.from('users').select('*').eq('userId', userId).single();
  if (error) return null;
  return data;
}

function getRefinedAuthErrorMessage(error) {
  return error.message.replace('Invalid login credentials', 'Invalid email or password');
}

export async function signInWithSupabase(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    window.sessionStorage.setItem("userId", data.user.id);
    const userData = await getUserDataSupabase(data.user.id);

    window.sessionStorage.setItem("isSecurity", String(userData?.isSecurity === true));
    return {
      isSuccessful: true,
      message: "Sign in successful",
      data: userData
    };
  } catch (error) {
    const errorMessage = getRefinedAuthErrorMessage(error);
    return {
      isSuccessful: false,
      message: errorMessage,
      data: null
    };
  }
}