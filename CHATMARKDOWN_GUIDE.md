# 🚀 ChatMarkdown Component - Hướng dẫn sử dụng

## 📦 Cài đặt thư viện

```bash
npm install react-markdown remark-gfm remark-breaks react-syntax-highlighter --legacy-peer-deps
npm install --save-dev @types/react-syntax-highlighter --legacy-peer-deps
```

## 🎯 Tính năng chính

### ✅ Định dạng Markdown đầy đủ
- **Headers**: H1, H2, H3 với màu cam FPTU (#F27024)
- **Text formatting**: **Bold** và *italic* với màu sắc phù hợp
- **Lists**: Bullets và numbered lists với màu cam
- **Links**: Tự động mở trong tab mới
- **Blockquotes**: Box highlight với màu cam
- **Tables**: Responsive với hover effects
- **Code blocks**: Syntax highlighting với dark theme
- **Horizontal rules**: Đường kẻ màu cam

### 🎨 Brand FPTU
- **Màu chính**: #F27024 (cam FPTU)
- **Bold text**: Màu cam
- **Bullets**: Màu cam
- **Headers**: Màu cam gradient
- **Blockquotes**: Viền cam, background light orange

## 🔧 Sử dụng

### Basic usage:
```tsx
import ChatMarkdown from '@/components/ChatMarkdown'

<ChatMarkdown content="**Bold text** and *italic text*" />
```

### Trong chat message:
```tsx
{message.role === 'assistant' ? (
  <ChatMarkdown content={message.content} />
) : (
  <div className="whitespace-pre-wrap">
    {message.content}
  </div>
)}
```

## 📝 Ví dụ Markdown

### Text formatting:
```markdown
Chào bạn, mình là **FPTU Da Nang Buddy** đây! 🍊

Về câu hỏi của bạn liên quan đến *IELTS 6.0*, mình xin giải thích như sau nha:
```

### Lists:
```markdown
*   **Yêu cầu đầu vào:** Chương trình đào tạo 100% tiếng Anh
*   **Nếu chưa đạt:** Đừng lo lắng nha!
*   **Lợi ích:** Pass thẳng lên học chuyên ngành
```

### Blockquote:
```markdown
> 💡 **Mẹo:** Hãy chuẩn bị kỹ cho kì thi đầu vào để có kết quả tốt nhất!
```

### Links:
```markdown
Xem thêm tại [FPTU Đà Nẵng](https://fpt.edu.vn)
```

### Tables:
```markdown
| Tiêu chí | Yêu cầu |
|----------|---------|
| IELTS | 6.0 |
| TOEFL | 72 |
```

## 🎨 Customization

### Thay đổi màu sắc:
```tsx
// Trong ChatMarkdown.tsx
strong: ({ children, ...props }) => (
  <strong 
    {...props} 
    className="font-semibold"
    style={{ color: '#YOUR_COLOR' }} // Thay đổi màu ở đây
  >
    {children}
  </strong>
)
```

### Custom className:
```tsx
<ChatMarkdown content={content} className="custom-prose" />
```

## 🚀 Performance

- ✅ **React.memo**: Component được memoized
- ✅ **Lightweight**: Chỉ render khi content thay đổi
- ✅ **SSR compatible**: Hoạt động tốt với Next.js SSR

## 🔍 Troubleshooting

### Nếu không hiển thị đúng:
1. **Kiểm tra import**: Đảm bảo import đúng path
2. **Kiểm tra content**: Content phải là string
3. **Kiểm tra Tailwind**: Đảm bảo @tailwindcss/typography được cài đặt

### Nếu màu không đúng:
1. **Kiểm tra CSS**: Đảm bảo Tailwind CSS được load
2. **Kiểm tra style**: Inline style có priority cao hơn

## 📱 Responsive

- ✅ **Mobile**: Tables tự động scroll ngang
- ✅ **Tablet**: Layout tối ưu cho tablet
- ✅ **Desktop**: Full width với max-width

## 🎯 Best Practices

1. **Sử dụng cho assistant messages**: Chỉ render cho AI responses
2. **Giữ nguyên user messages**: User messages dùng plain text
3. **Validate content**: Đảm bảo content là valid Markdown
4. **Error handling**: Component có fallback nếu parse error

## 📚 Dependencies

- `react-markdown`: Core Markdown renderer
- `remark-gfm`: GitHub Flavored Markdown (tables, lists)
- `remark-breaks`: Better line break handling
- `react-syntax-highlighter`: Code syntax highlighting
- `@types/react-syntax-highlighter`: TypeScript types

## 🎉 Kết quả

Khi tích hợp vào chat, response sẽ hiển thị:
- ✅ **Bold text** với màu cam FPTU
- ✅ Bullets với màu cam
- ✅ Links có hover effects
- ✅ Tables responsive
- ✅ Code blocks với syntax highlighting
- ✅ Proper spacing và line breaks

**Ready to use!** 🚀 Component đã sẵn sàng tích hợp vào FPTU AI Assistant!
