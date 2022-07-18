import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" passHref>
      <a>
        <ImageLogo src="/logo.png" alt="Brickbro logo" width={450} height={116}></ImageLogo>
      </a>
    </Link>
  )
}

const ImageLogo = styled(Image)`
  width: 80px;
  height: 100px;
`
