const BASE_URL = "http://localhost:3000/plans";

export async function getPlan(planId) {
  const response = await fetch(`${BASE_URL}/getPlan/${planId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Plan Recieved  successfully");
    return data;
  } else {
    console.error("Error Getting plan");
    throw new Error("Error Getting plan");
  }
}

export async function createPlan(planData) {
  const response = await fetch(`${BASE_URL}/createPlan`, {
    method: "POST",
    body: JSON.stringify(planData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Plan created successfully");
    return data;
  } else {
    console.error("Error creating plan");
    throw new Error("Error creating plan");
  }
}

export async function getAllPlans() {
  const response = await fetch(`${BASE_URL}/getPlans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Plans received successfully");
    return data;
  } else {
    console.error("Error getting plans");
    throw new Error("Error getting plans");
  }
}
