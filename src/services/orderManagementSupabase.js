import { supabase } from "../config/supabase.config";

export async function getAllOrdersSupabase() {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return [];
  return data;
}

export async function getAOrderSupabase(orderId) {
  try {
    const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
    if (error) return null;
    return data;
  } catch (error) {
    return null;
  }
}

export async function filterOrdersByUserSupabase(userId) {
  try {
    const { data, error } = await supabase.from("orders").select("*").eq("userId", userId);
    if (error) return [];
    return data;
  } catch (error) {
    return [];
  }
}

export async function createAOrderSupabase(orderData) {
  try {
    const { data, error } = await supabase.from("orders").insert(orderData);
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateAOrderSupabase(orderId, orderData) {
  try {
    const { data, error } = await supabase.from("orders").update(orderData).eq("id", orderId);
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteOrderSupabase(orderId) {
  try {
    const { data, error } = await supabase.from("orders").delete().eq("id", orderId);
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
}