import html2pdf from 'html2pdf.js'

export const downloadAsPdf = async (content, fontSize, contentLayout) => {
  const tempDiv = document.createElement('div')
  tempDiv.className = 'pdf-container'
  tempDiv.style.width = '100%'
  tempDiv.style.maxWidth = '800px'
  tempDiv.style.margin = '0 auto'
  tempDiv.style.padding = '20px'

  let fontSizeValue = '16px'
  if (fontSize === 'small') fontSizeValue = '14px'
  if (fontSize === 'large') fontSizeValue = '18px'

  const style = document.createElement('style')
  style.textContent = `
    .pdf-container {
      font-family: 'Helvetica', sans-serif;
      color: #000 !important;
      line-height: 1.5;
      background-color: #fff !important;
    }
    * {
      color: inherit !important;
      background-color: inherit !important;
    }
    .pdf-content-block {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    .pdf-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    .pdf-text {
      font-size: ${fontSizeValue};
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
    }
    h2 {
      font-size: ${parseInt(fontSizeValue) + 6}px;
    }
    ul, ol {
      padding-left: 20px;
    }
  `
  tempDiv.appendChild(style)

  const title = document.createElement('h1')
  title.textContent = 'Simplified Content'
  title.style.textAlign = 'center'
  title.style.marginBottom = '30px'
  title.style.fontSize = '24px'
  tempDiv.appendChild(title)

  content.forEach((item, index) => {
    const block = document.createElement('div')
    block.className = 'pdf-content-block'

    const img = document.createElement('img')
    img.src = item.image_url
    img.className = 'pdf-image'
    img.alt = `Content visualization ${index + 1}`

    const textDiv = document.createElement('div')
    textDiv.className = 'pdf-text'
    const htmlContent = item.text_markdown
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/\* (.*)/g, '<li>$1</li>')
      .replace(/\n\n/g, '<br><br>')
    textDiv.innerHTML = htmlContent

    if (contentLayout === 'image-top' || contentLayout === 'image-left') {
      block.appendChild(img)
      block.appendChild(textDiv)
    } else {
      block.appendChild(textDiv)
      block.appendChild(img)
    }

    tempDiv.appendChild(block)
  })

  // Sanitize any remaining oklch colors
  tempDiv.querySelectorAll('*').forEach(element => {
    if (window.getComputedStyle(element).color.includes('oklch')) {
      element.style.color = '#000'
    }
    if (window.getComputedStyle(element).backgroundColor.includes('oklch')) {
      element.style.backgroundColor = 'transparent'
    }
  })

  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  document.body.appendChild(tempDiv)

  try {
    const options = {
      margin: [10, 10],
      filename: 'simplified-content.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    await html2pdf().set(options).from(tempDiv).save()
  } catch (error) {
    console.error('Error generating PDF:', error)
  }

  document.body.removeChild(tempDiv)
}
