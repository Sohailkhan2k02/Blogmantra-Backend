import { } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import Register from './components/Users/Register/Register'
import Login from './components/Users/Login/Login'
import Navbar from './components/Navigation/Navbar'
import AddNewCategory from './components/Categories/AddNewCategory'
import CategoryList from './components/Categories/CategoryList'
import UpdateCategory from './components/Categories/UpdateCategory'
import AdminProtectRoute from './components/Navigation/ProtectedRoutes/AdminProtectRoute'
import PrivateProtectRoute from './components/Navigation/ProtectedRoutes/PrivateProtectRoute'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import PostDetails from './components/Posts/PostDetails'
import UpdatePost from './components/Posts/UpdatePost'
import UpdateComment from './components/Comments/UpdateComment'
import Profile from './components/Users/Profile/Profile'
import UploadProfilePhoto from './components/Users/Profile/UploadProfilePhoto'
import UpdateProfileForm from './components/Users/Profile/UpdateProfileForm'
import SendEmail from './components/Users/Email/SendEmail'
import AccountVerified from './components/Users/AccountVerification/AccountVerified'
import UsersList from './components/Users/UserList/UsersList'
import UpdatePassword from './components/Users/PasswordManagement/UpdatePassword'
import ResetPasswordForm from './components/Users/PasswordManagement/ResetPasswordForm'
import ResetPassword from './components/Users/PasswordManagement/ResetPassword'



function App() {


  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route
            exact path='/'
            element={<HomePage />}
          />
          <Route
            exact path='/add-category'
            element={<AdminProtectRoute> <AddNewCategory /> </AdminProtectRoute>}
          />
          <Route
            exact path='/users'
            element={<AdminProtectRoute> <UsersList /> </AdminProtectRoute>}
          />
          <Route
            exact path='/posts'
            element={<PostsList />}
          />
          <Route
            exact path='/posts/:id'
            element={<PostDetails />}
          />
          <Route
            exact path='/password-reset-token'
            element={<ResetPasswordForm />}
          />
          <Route
            exact path='/reset-password/:token'
            element={<ResetPassword />}
          />
          <Route
            exact path='/create-post'
            element={<PrivateProtectRoute> <CreatePost /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/update-password'
            element={<PrivateProtectRoute> <UpdatePassword /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/update-post/:id'
            element={<PrivateProtectRoute> <UpdatePost /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/update-comment/:id'
            element={<PrivateProtectRoute> <UpdateComment /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/profile/:id'
            element={<PrivateProtectRoute> <Profile /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/upload-profile-photo'
            element={<PrivateProtectRoute> <UploadProfilePhoto /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/update-profile/:id'
            element={<PrivateProtectRoute> <UpdateProfileForm /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/verify-account/:token'
            element={<PrivateProtectRoute> <AccountVerified /> </PrivateProtectRoute>}
          />
          <Route
            exact path='/send-email'
            element={<AdminProtectRoute> <SendEmail /> </AdminProtectRoute>}
          />
          <Route
            exact path='/update-category/:id'
            element={<AdminProtectRoute> <UpdateCategory /> </AdminProtectRoute>}
          />
          <Route
            exact path='/category-list'
            element={<AdminProtectRoute> <CategoryList /> </AdminProtectRoute>}
          />
          <Route
            exact path='/register'
            element={<Register />}
          />
          <Route
            exact path='/login'
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
