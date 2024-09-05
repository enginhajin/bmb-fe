import { PATHS } from '@/constants/path'
import { useRouter } from 'next/navigation'

const useCustomNavigation = () => {
  const router = useRouter()

  const navigateToHome = () => {
    router.push(PATHS.HOME)
  }
  const navigateToSignIn = () => {
    router.push(PATHS.SIGNIN)
  }
  const navigateToSignUp = () => {
    router.push(PATHS.SIGNUP)
  }
  const navigateToBookDetail = (bookId: string) => {
    router.push(`${PATHS.BOOKS}/${bookId}`)
  }
  const navigateToWishList = () => {
    router.push(PATHS.WISH)
  }
  const navigateToLoanList = () => {
    router.push(PATHS.LOAN)
  }
  const navigateToAdminBooks = () => {
    router.push(PATHS.ADMIN_BOOKS)
  }
  const navigateToAdminBookDetail = (bookId: string) => {
    router.push(`${PATHS.ADMIN_BOOKS}/${bookId}`)
  }
  const navigateToBookApplication = () => {
    router.push(PATHS.ADMIN_APPLICATION)
  }
  const navigateToBack = () => {
    router.back()
  }

  return {
    navigateToHome,
    navigateToSignIn,
    navigateToSignUp,
    navigateToBookDetail,
    navigateToWishList,
    navigateToLoanList,
    navigateToAdminBooks,
    navigateToAdminBookDetail,
    navigateToBookApplication,
    navigateToBack,
  }
}

export default useCustomNavigation
