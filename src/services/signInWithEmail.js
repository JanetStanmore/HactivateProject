import { supabase } from "../config/supabase.config";

export async function getUserData(userId) {
  const { data, error } = await supabase.from('users').select('*').eq('userId', userId).single();
  if (error) return null;
  return data;
}

function getRefinedAuthErrorMessage(error) {
  return error.message.replace('Invalid login credentials', 'Invalid email or password');
}

export default async function signInWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    window.sessionStorage.setItem("userId", data.user.id);
    const userData = await getUserData(data.user.id);

    window.sessionStorage.setItem("isSecurity", userData?.isSecurity || false);
    return {
      isSuccessful: true,
      message: "Sign in successful",
      data: userData
    };
  } catch (error) {
    console.log(error.message);
    const errorMessage = getRefinedAuthErrorMessage(error);
    return {
      isSuccessful: false,
      message: errorMessage,
      data: null
    };
  }
}