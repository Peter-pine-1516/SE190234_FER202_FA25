// Cấu hình cho form đặt vé máy bay
export const formConfig = {
  // Cấu hình cho các trường input
  fields: {
    fullName: {
      label: 'Họ tên',
      placeholder: 'Họ tên',
      helpText: 'Phải nhập 5 ký tự, in hoa.....',
      icon: '👤',
      appendText: 'vnđ'
    },
    address: {
      label: 'Địa chỉ',
      placeholder: 'Địa chỉ',
      helpText: 'Phải nhập 5 ký tự, in hoa.....',
      rows: 3
    },
    from: {
      label: 'Đi từ',
      defaultValue: 'Hà nội'
    },
    to: {
      label: 'Đến',
      defaultValue: 'Hà nội'
    },
    travelType: {
      label: 'Chọn chiều đi (Khứ hồi)',
      options: [
        { label: 'Đi', value: 'one-way', id: 'one-way' },
        { label: 'Về', value: 'round-trip', id: 'round-trip' }
      ]
    }
  },
  
  // Cấu hình cho button
  button: {
    text: 'Đặt vé',
    variant: 'primary',
    size: 'lg'
  },
  
  // Cấu hình cho card
  card: {
    title: 'Form đặt vé máy bay',
    headerClass: 'bg-warning'
  }
};

export default formConfig;
