import { cn } from '@/lib/utils'
import MDEditor from '@uiw/react-md-editor';

const TextEditor = ({
    value, 
    onChange, 
    className, 
    ...props}: {
        value: string, 
        className: string, 
        onChange: ()=> string}) => {
  return (
    <div data-color-mode="light" className="w-full">
        <MDEditor
        value={value}
        onChange={onChange}
        height={200}
        preview="edit"
        className={cn("w-full bg-white text-black  rounded-lg", className)}
        {...props}
        /> 
    </div>

  )
}

export default TextEditor