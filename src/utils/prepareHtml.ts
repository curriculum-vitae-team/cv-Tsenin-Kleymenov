const prepareStyles = (): HTMLStyleElement => {
  const styleElement = document.createElement('style')
  const styleSheets = [...document.styleSheets]
  const links = styleSheets.reduce<Node[]>((acc, styleSheet) => {
    const { ownerNode } = styleSheet

    if (ownerNode instanceof Element) {
      if (ownerNode.tagName === 'LINK') {
        acc.push(ownerNode.cloneNode(true))
        return acc
      }
      if (ownerNode.tagName === 'STYLE') {
        const style = document.createElement('style')
        style.innerHTML = [...styleSheet.cssRules].map(cssRule => cssRule.cssText).join('\n')
        acc.push(style)
        return acc
      }
    }
    return acc
  }, [])
  styleElement.append(...links)

  return styleElement
}

export const prepareHtml = (content: HTMLElement): string => {
  const page = document.createElement('div')
  page.append(content.cloneNode(true), prepareStyles())

  return page.outerHTML
}
