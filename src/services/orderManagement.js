import { supabase } from "../config/supabase.config";

export async function getAllOrders() {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return [];
  return data;
}

export async function getAOrder(orderId) {
  try {
    const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
    if (error) return null;
    return data;
  } catch (error) {
    return null;
  }
}

export async function filterOrdersByUser(userId) {
  try {
    const { data, error } = await supabase.from("orders").select("*").eq("userId", userId);
    if (error) return [];
    return data;
  } catch (error) {
    return [];
  }
}

export async function createAOrder(orderData) {
  try {
    const { data, error } = await supabase.from("orders").insert(orderData);
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateAOrder(orderId, orderData) {
  try {
    const { data, error } = await supabase.from("orders").update(orderData).eq("id", orderId);
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteOrder(orderId) {
  try {
    const { data, error } = await supabase.from("orders").delete().eq("id", orderId);
    if (error) return false;
    return true;
  } catch (error) {
    return false;
  }
}
