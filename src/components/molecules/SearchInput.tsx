import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Form, FormField } from '@/components/ui/form'
import { z } from 'zod'
import { BookSearchInfo, SearchCategory } from '@/types/books'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const selectItems: { category: SearchCategory; label: string }[] = [
  {
    category: 'ALL',
    label: 'キーワード',
  },
  {
    category: 'TITLE',
    label: 'タイトル',
  },
  {
    category: 'AUTHOR',
    label: '著者',
  },
  {
    category: 'PUBLISHER',
    label: '出版社',
  },
]

const schema = z.object({
  category: z.enum(['ALL', 'TITLE', 'AUTHOR', 'PUBLISHER']),
  keyword: z.string(),
})

export interface SearchInputProps {
  data: BookSearchInfo
  onSearch: (data: BookSearchInfo) => void
}

const SearchInput = ({ data, onSearch }: SearchInputProps) => {
  const form = useForm<BookSearchInfo>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      category: data.category,
      keyword: data.keyword,
    },
  })
  const { control, handleSubmit } = form

  const onSubmit = (currentData: BookSearchInfo) => {
    onSearch(currentData)
  }

  return (
    <Form {...form}>
      <form
        className="mb-6 flex w-full md:ml-auto md:max-w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-25 flex-shrink-0 rounded-r-none border-r-0 px-2 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="キーワード" />
              </SelectTrigger>
              <SelectContent>
                {selectItems.map((item) => {
                  const { category, label } = item
                  return (
                    <SelectItem
                      key={category}
                      value={category}
                      className="px-2"
                    >
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={control}
          name="keyword"
          render={({ field }) => (
            <Input className="rounded-l-none" {...field} />
          )}
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="ml-2 shrink-0"
        >
          <Search />
        </Button>
      </form>
    </Form>
  )
}

export { SearchInput }
