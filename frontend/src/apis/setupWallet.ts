const API = import.meta.env.VITE_API_URL;
import { toast } from "sonner";

export const setupWallet = async (username: string, balance: number) => {
  try {
    const response = await fetch(`${API}/setup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, balance }),
    });
    const result = await response.json();

    return result?.data;
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Failed to setup wallet"
    );
    console.log(error);
  }

  return null;
};
