import { cn } from '@/lib/utils';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { CSSProperties } from 'react';

const TextEditor = ({
  value,
  onChange,
  className,
  placeholder,
  styles = [],
  ...props
}: {
  value: string;
  className?: string;
  placeholder?: string;
  styles?: CSSProperties[];
  onChange: (value: string | undefined) => void;
}) => {
  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor
        value={value}
        onChange={onChange}
        height={200}
        preview="edit"
        commands={[
          commands.bold,
          commands.italic,
          commands.hr,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.link,
          commands.code,
          commands.checkedListCommand,
        ]}
        textareaProps={{
          placeholder: placeholder || 'Write here...',
        }}
        className={cn('w-full bg-white text-black rounded-lg', className)}
        style={Object.assign({ color: '#363636' }, ...styles)}
        {...props}
      />
    </div>
  );
};

export default TextEditor;
