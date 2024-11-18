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
import { SearchInfo } from '@/types/books'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

const schema = z.object({
  category: z.enum(['ALL', 'TITLE', 'AUTHOR', 'PUBLISHER', 'ID', 'NICKNAME']),
  keyword: z.string(),
})

export interface SearchInputProps {
  data: SearchInfo
  onSearch: (data: SearchInfo) => void
  selectItems: {
    category: string
    label: string
  }[]
}

const SearchInput = ({ data, onSearch, selectItems }: SearchInputProps) => {
  const form = useForm<SearchInfo>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      category: data.category,
      keyword: data.keyword,
    },
  })
  const { setValue } = form
  const { control, handleSubmit } = form

  const onSubmit = (currentData: SearchInfo) => {
    onSearch(currentData)
  }

  useEffect(() => {
    setValue('keyword', data.keyword)
  }, [data.keyword, setValue])

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
