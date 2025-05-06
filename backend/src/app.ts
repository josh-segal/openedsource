import express from 'express';
import issuesRoutes from './api/issues';
import bookmarksRoutes from './api/bookmarks';
import adminRoutes from './api/admin';

const app = express();
app.use(express.json());

app.use('/', issuesRoutes);
app.use('/bookmarks', bookmarksRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));