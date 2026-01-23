// lib/api.js - Common API utilities

export async function createSoldItem(data) {
  try {
    const response = await fetch('/api/solditem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create sold item');
    }

    return { success: true, data: result.soldItem };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch('/api/product');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchSoldItems() {
  try {
    const response = await fetch('/api/solditem');

    if (!response.ok) {
      throw new Error('Failed to fetch sold items');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching sold items:', error);
    throw error;
  }
}
