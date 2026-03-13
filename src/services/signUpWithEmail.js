import { supabase } from "../config/supabase.config";

async function addUserDocument(user) {
  const { data, error } = await supabase.from('users').insert(user);
  if (error) throw error;
  return true;
}

export default async function signUpWithEmail(fullName, email, password, isSecurity) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: fullName, isSecurity }
    }
  });

  if (error) {
    console.error(error);
    return false;
  }

  if (data.user) {
    const userData = {
      name: fullName,
      email: data.user.email,
      userId: data.user.id,
      isSecurity
    };
    await addUserDocument(userData);
    window.sessionStorage.setItem("userId", data.user.id);
    window.sessionStorage.setItem("isSecurity", isSecurity);
    return true;
  }
  return false;
}
