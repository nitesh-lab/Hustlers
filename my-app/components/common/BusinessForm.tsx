"use client"
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { axiosInstance } from '@/lib/axiosInstance';
import email from 'next-auth/providers/email';
import { useRouter } from "next/navigation"

interface FormData {
  name: string;
  location: string;
  website?: string;
  image: File | null;
}

const BusinessForm= ({email}:{email:string}) => {

    const router=useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    website: '',
    image: null
  });

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    setErrors({ ...errors, image: '' });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', location: '', image: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
      valid = false;
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('location', formData.location);
      data.append('website', formData.website || '');
      data.append("email",email);
      if (formData.image) {
        data.append('image', formData.image);
      }

      try {
        const res = await axiosInstance.post("/api/user/createBusiness", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        router.push("/dashboard");

      } catch (error) {
        console.error('Error submitting form:', error);
        
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="Selected" className="w-full h-full rounded-full" />
            ) : (
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
              </svg>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            hidden={true}
          />
        </div>
        {errors.image && <p className="text-red-500 text-sm mb-4 text-center">{errors.image}</p>}
        <h1 className="text-2xl font-bold text-white mb-5 text-center">Business Info</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-white font-semibold mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="website" className="block text-white font-semibold mb-2">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;
