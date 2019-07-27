import axios from 'axios';

export const logout = async () => {
  try {
    await axios.post('/api/admin/logout');
  } catch (error) {}
};
