import React, { useState, useEffect, useReducer } from 'react'
import { PiNewspaper, PiCoffee } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { PiX, PiPen, PiTrash } from 'react-icons/pi'

import { useGlobal } from '../core/global'
import { useNavigate } from 'react-router-dom'
import { api } from '../core/api'

const Dashboard = () => {
  const [reducer, forceFetchNews] = useReducer(x => x + 1, 0)

  const { logout } = useGlobal()
  const navigate = useNavigate()
  const [newsPosts, setNewsPosts] = useState([])

  const [newsloading, setNewsLoading] = useState(true)
  const [newsfetchError, setNewsFetchError] = useState('')
  const fetchNews = async () => {
    setNewsFetchError('')
    setNewsLoading(true)
    try {
      const response = await api.get('/news')
      setNewsPosts(response.data)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error?.message || 'Unable to load news'
      setNewsFetchError(errorMessage)
    } finally {
      setNewsLoading(false)
    }
  }

  // Add new post
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const handleEditorChange = ({ text }) => {
    setContent(text)
  }

  const handleImageChange = e => {
    setImage(e.target.files)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content_markdown', content)
      formData.append('description', description)
      if (image) {
        for (let i = 0; i < image.length; i++) {
          formData.append('images', image[i])
        }
      }
      const response = await api.post('/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setSuccess(true)
      setTitle('')
      setContent('')
      setImage(null)
      forceFetchNews()
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err?.message || 'Unable to load news'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Edit News
  const [newsEdit, setNewsEdit] = useState(null)

  // Delete Post
  const [newdeleteEeeoe, setNewsDeleteError] = useState('')
  const handleDeletePost = async id => {
    setNewsDeleteError('')
    try {
      const response = await api.delete(`/news/${id}`)
      forceFetchNews()
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error?.message ||
        'Unable to delete news'
      setNewsDeleteError(errorMessage)
    }
  }

  // Handling Logout
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    fetchNews()
  }, [reducer])

  return <div className='min-h-screen bg-primary/5 p-6'>Dashboard</div>
}

export default Dashboard
