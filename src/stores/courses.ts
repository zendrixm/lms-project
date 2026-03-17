import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Course } from '@/types/api'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref<Course[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCourses = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/mock/courses.json')
      if (!response.ok) throw new Error('Failed to fetch courses')
      courses.value = await response.json()
    } catch (err) {
      error.value = 'Failed to load courses'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const updateProgress = (courseId: string, progress: number) => {
    const course = courses.value.find(c => c.id === courseId)
    if (course) course.progress = progress
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
    updateProgress
  }
})
