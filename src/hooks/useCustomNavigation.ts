import { useRouter } from 'next/navigation'

const useCustomNavigation = () => {
  const router = useRouter()

  const navigateToHome = () => {
    router.push('/')
  }
  const navigateToSignIn = () => {
    router.push('/signin')
  }
  const navigateToSignUp = () => {
    router.push('/signup')
  }
  const navigateToBookDetail = (bookId: string) => {
    router.push(`/books/${bookId}`)
  }
  const navigateToWishList = () => {
    router.push('/mypage/wish')
  }
  const navigateToLoanList = () => {
    router.push('/mypage/loan')
  }
  const navigateToLoan = (bookId: string) => {
    router.push(`/books/loan/${bookId}`)
  }

  return {
    navigateToHome,
    navigateToSignIn,
    navigateToSignUp,
    navigateToBookDetail,
    navigateToWishList,
    navigateToLoanList,
    navigateToLoan,
  }
}

export default useCustomNavigation
