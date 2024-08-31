'use client'

import { BookInfo } from '@/components/organisms/BookInfo'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookDetailInfo, BookWishInfo } from '@/types/books'
import { useState } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { LoanSheetConent } from '@/components/organisms/LoanSheetContent'

const mockData: BookDetailInfo = {
  id: '201',
  isbn: '9784479394358',
  title:
    '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
  description: `【100万人が沸いたスゴい読書！！！！】
          名作３作＋『変な家』大ヒット・雨穴「本棚」特別寄稿！
          
          ＳＮＳで話題沸騰の「オモコロ」大人気シリーズを書籍化！
          「読書の常識が変わる……。これは全く新しい本の読み方です」――雨穴氏
          「ついに日本一おもしろく『走れメロス』を読む人間が現れた」――ダ・ヴィンチ・恐山氏

          「生まれて一度も読書をしたことがない男が本を読んだら、一体どうなるんだろう」
          そんな素朴な疑問がきっかけで生まれた「本を読んだことがない32歳が初めて『走れメロス』を読む日」というオモコロ記事。
          １人の男が人生で初めて本を読む。ただそれだけの記事が爆発的に拡散され、100万人の目に留まる大ヒット記事に……！`,
  thumbnail: '/img/book/book_thumbnail.jpg',
  author_name: 'かまど・みくのしん',
  publisher_name: '大和書房',
  published_date: '2024-09-19',
  status: 'CHECKED_OUT',
  loans: [
    {
      id: '1',
      user_id: 'jonedoe1',
      nickname: 'ジョン',
      loan_at: '2024-08-19',
      return_at: null,
    },
    {
      id: '2',
      user_id: 'jonedoe2',
      nickname: 'ありがとう',
      loan_at: '2024-07-31',
      return_at: '2024-08-08',
    },
    {
      id: '3',
      user_id: 'jonedoe3',
      nickname: '鈴木',
      loan_at: '2024-07-15',
      return_at: '2024-07-16',
    },
  ],
}

const mockWishData: BookWishInfo = {
  wished: false,
  wish_count: 5,
}

export default function BookPage() {
  const [openLoanSheet, setOpenLoanSheet] = useState<boolean>(false)

  return (
    <GnbTemplate>
      <BookInfo
        bookData={mockData}
        wishData={mockWishData}
        onOpenLoanSheet={() => {
          setOpenLoanSheet(true)
        }}
      />
      <Sheet open={openLoanSheet} onOpenChange={setOpenLoanSheet}>
        <LoanSheetConent data={mockData} />
      </Sheet>
    </GnbTemplate>
  )
}
