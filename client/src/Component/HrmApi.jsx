
/**
 * @param {Object} payload - Form fields originating from the component hook layers
 * @returns {Promise<Object>} Cleaned JSON structure mapping endpoint execution status
 */
export const registerCompanyApi = async (payload) => {
  try {
    const response = await fetch("https://jobdekho-3vnx.onrender.com/api/v1/company/register", {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("🔴 Backend Validation Error Payload:", data);
      
      return {
        success: false,
        message: data?.message || `Validation Failed (${response.status})`,
      };
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Network layer crash inside registerCompanyApi:", error);
    return {
      success: false,
      message: "Network request failed. Check server status.",
    };
  }
};