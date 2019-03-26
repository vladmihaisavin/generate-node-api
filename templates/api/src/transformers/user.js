export default (data) => ({
  id: data.id,
  email: data.email,
  created_at: data.createdAt ? data.createdAt : '-',
  updated_at: data.updatedAt ? data.updatedAt : '-'
});
