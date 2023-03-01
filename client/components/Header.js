import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <header>
      <Link href="/">
        <svg
          height="20"
          viewBox="0 0 209 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.76 27.56C17.68 27.56 22.84 20.68 22.84 12.36C22.84 6 19.28 2.12 13.24 2.12C5.32 2.12 0.12 9 0.12 17.32C0.12 23.68 3.72 27.56 9.76 27.56ZM9.8 25C6.4 25 4.56 22.68 4.56 18.12C4.56 12.12 7.72 4.68 13.16 4.68C16.6 4.68 18.44 6.96 18.44 11.56C18.44 17.56 15.28 25 9.8 25ZM30.1394 27.36C34.5394 27.36 36.4594 23.68 37.0594 23.68C37.1794 23.68 37.1794 23.8 37.1794 23.96V24.92C37.1794 25.8 37.3794 27.16 39.1794 27.16C40.3794 27.16 42.4594 26.6 42.4594 25.52C42.4594 24.68 40.8594 25.12 40.8594 22.2C40.8594 19.76 43.0194 10.88 43.0194 10.2C43.0194 9.48 42.3794 8.92 40.9394 8.92C39.1394 8.92 38.7394 9.32 38.5794 10.16C38.2994 11.8 38.0594 13.84 37.6194 16.32C36.6594 21.88 34.0994 24.68 31.6994 24.68C30.5394 24.68 29.8594 24.04 29.8594 22.68C29.8594 20.48 31.8594 14.24 31.8594 11.64C31.8594 9.84 31.0594 8.88 29.5794 8.88C27.7794 8.88 26.3394 9.64 26.3394 10.44C26.3394 11.28 27.4594 10.96 27.4594 12.84C27.4594 15.28 25.6994 19.96 25.6994 22.64C25.6994 25.16 26.8594 27.36 30.1394 27.36ZM60.4434 27.32C62.0034 27.32 63.4834 26.52 63.4834 25.6C63.4834 24.72 61.7234 25.24 61.7234 23C61.7234 20.28 63.6834 16.12 63.6834 13.32C63.6834 10.88 62.4834 8.64 59.1634 8.64C54.9234 8.64 53.4034 11.84 52.8434 11.84C52.7634 11.84 52.6834 11.8 52.6834 11.64C52.6834 10.92 54.1634 5.16 54.1634 3.16C54.1634 1.6 53.4434 0.839998 51.8834 0.839998C50.4434 0.839998 48.5634 1.36 48.5634 2.24C48.5634 3.04 49.7634 2.64 49.7634 4.64C49.7634 5.52 49.5234 6.68 47.9234 15.8C47.1234 20.48 45.8434 25.12 45.8434 25.92C45.8434 26.64 46.4834 27.2 47.8834 27.2C49.6834 27.2 50.1234 26.76 50.2434 25.96L51.0834 21.28C52.4434 14 55.1634 11.32 57.6034 11.32C58.8434 11.32 59.5234 11.96 59.5234 13.28C59.5234 15.64 57.4834 21.04 57.4834 23.84C57.4834 26.2 58.6434 27.32 60.4434 27.32ZM80.3344 27.36C82.0544 27.36 83.7744 26.04 83.8144 24.72C83.8144 24.28 83.5744 23.96 83.0944 23.96C82.5744 23.96 82.1344 24.12 81.6144 23.88C81.2944 23.76 80.6144 22.68 79.6144 20.92C78.0544 18.36 77.0144 16.32 77.0144 15.6C77.0144 15.08 79.7744 12.32 80.8544 12.32C81.7344 12.32 82.0944 13.28 83.0544 13.28C83.9344 13.28 85.0144 10.84 85.0144 10.2C85.0144 9.44 84.2144 8.72 82.7744 8.72C80.8144 8.72 78.1744 10.48 74.4144 14.96C73.9344 15.6 73.8544 15.84 73.3344 15.84C73.1744 15.84 73.1344 15.76 73.1344 15.6C73.1344 14.96 75.3744 5.12 75.3744 3.2C75.3744 1.64 74.6544 0.839998 73.0944 0.839998C71.6544 0.839998 69.7744 1.36 69.7744 2.24C69.7744 3.04 70.9744 2.68 70.9744 4.64C70.9744 5.52 70.7344 6.68 69.1344 15.8C68.3344 20.48 67.0544 25.12 67.0544 25.92C67.0544 26.64 67.6944 27.2 69.0944 27.2C70.8944 27.2 71.3344 26.76 71.4544 25.96C71.6544 24.92 72.4944 19.72 72.6544 18.72C72.6944 18.24 72.8144 18.08 73.0544 18.08C73.5344 18.08 73.6544 18.16 73.8544 18.68L76.2144 22.96C77.5344 26.16 78.2944 27.36 80.3344 27.36ZM91.6675 27.44C94.2675 27.44 97.0275 25.52 97.0275 24.12C97.0275 23.68 96.7475 23.4 96.3075 23.4C95.7875 23.4 94.9075 24.44 93.4275 24.44C92.5475 24.44 91.9475 24 91.9475 22.88C91.9475 22.6 91.9475 22.2 92.0675 21.76L93.7075 12.04C93.7875 11.68 93.9475 11.52 94.3075 11.52H98.2675C98.9475 11.52 99.4275 11 99.4275 9.96C99.4275 9.44 99.1875 9.12 98.6675 9.12C97.8675 9.12 96.1875 9.16 94.7475 9.16C94.4675 9.16 94.3475 9 94.3475 8.76C94.3475 8.56 94.7075 6.52 94.9475 5.28C94.9875 4.84 94.7875 4.48 94.3875 4.48H94.0675C93.2675 4.48 92.8275 5 92.0675 6.76C91.1475 8.08 90.3875 8.76 89.1475 9.24C87.7075 9.8 87.2275 9.76 87.2275 10.6C87.2275 11.36 87.8275 11.52 89.1075 11.52C89.4275 11.52 89.5475 11.68 89.5475 11.88C89.5475 12.24 87.6675 22.08 87.6675 23.4C87.6675 25.76 88.9875 27.44 91.6675 27.44ZM105.855 34.32C112.055 34.32 114.335 30.68 115.175 26.12L116.335 19.48C116.775 17.16 118.335 10.88 118.335 10.2C118.335 9.44 117.695 8.92 116.295 8.92C114.455 8.92 114.055 9.32 113.895 10.16C113.575 12.04 113.295 13.84 112.975 15.64C111.975 21.32 109.375 24.16 106.935 24.16C105.815 24.16 105.135 23.52 105.135 22.2C105.135 19.92 107.055 14.24 107.055 11.64C107.055 9.84 106.255 8.88 104.735 8.88C102.975 8.88 101.495 9.64 101.495 10.44C101.495 11.28 102.655 10.96 102.655 12.84C102.655 15.28 100.975 19.24 100.975 22.2C100.975 24.64 102.095 26.84 105.415 26.84C109.415 26.84 111.215 23.8 111.655 23.8C111.775 23.8 111.735 23.88 111.695 24.28C111.655 24.76 111.375 25.96 111.295 26.44C110.535 30 109.535 32.12 106.215 32.12C103.015 32.12 102.615 28.04 101.175 28.04C100.415 28.04 99.3747 29.76 99.3747 30.72C99.3747 32.08 102.015 34.32 105.855 34.32ZM134.732 27.52C140.412 27.52 144.372 24.56 144.372 20.48C144.372 16.36 141.132 14.36 137.852 12.72C134.692 10.92 133.412 9.96 133.412 8.04C133.412 6.36 134.972 4.52 138.092 4.52C142.292 4.52 142.452 8.88 144.012 8.88C144.812 8.88 146.252 7.28 146.252 6.12C146.252 4.64 143.132 2.16 138.452 2.16C133.012 2.16 129.132 5 129.132 9.16C129.132 12.64 131.932 14.56 135.252 16.2C138.452 17.96 140.012 19.16 140.012 21.4C140.012 23.56 137.972 25.16 135.132 25.16C130.652 25.16 129.732 19.72 128.092 19.72C127.292 19.72 125.972 21.56 125.972 22.64C125.932 24.12 129.132 27.52 134.732 27.52ZM163.217 27.32C164.777 27.32 166.257 26.52 166.257 25.6C166.257 24.72 164.497 25.24 164.497 23C164.497 20.28 166.457 16.12 166.457 13.32C166.457 10.88 165.257 8.64 161.937 8.64C157.697 8.64 156.177 11.84 155.617 11.84C155.537 11.84 155.457 11.8 155.457 11.64C155.457 10.92 156.937 5.16 156.937 3.16C156.937 1.6 156.217 0.839998 154.657 0.839998C153.217 0.839998 151.337 1.36 151.337 2.24C151.337 3.04 152.537 2.64 152.537 4.64C152.537 5.52 152.297 6.68 150.697 15.8C149.897 20.48 148.617 25.12 148.617 25.92C148.617 26.64 149.257 27.2 150.657 27.2C152.457 27.2 152.897 26.76 153.017 25.96L153.857 21.28C155.217 14 157.937 11.32 160.377 11.32C161.617 11.32 162.297 11.96 162.297 13.28C162.297 15.64 160.257 21.04 160.257 23.84C160.257 26.2 161.417 27.32 163.217 27.32ZM177.111 27.44C183.391 27.44 187.431 22.36 187.431 16.12C187.431 11.48 184.711 8.68 180.071 8.68C173.791 8.68 169.751 13.76 169.751 19.96C169.751 24.64 172.471 27.44 177.111 27.44ZM177.151 25.32C175.191 25.32 174.031 23.88 174.031 21C174.031 16.8 176.071 10.8 179.991 10.8C181.991 10.8 183.151 12.24 183.151 15.12C183.151 19.32 181.111 25.32 177.151 25.32ZM190.741 34.12C192.501 34.12 192.941 33.68 193.061 33L194.221 25.52C194.301 25.04 194.381 24.56 194.621 24.56C195.021 24.56 195.661 27.32 199.381 27.32C204.901 27.32 208.381 21.56 208.381 15.44C208.381 11.16 206.301 8.64 202.821 8.64C198.661 8.64 196.821 12.28 196.181 12.28C196.101 12.28 196.061 12.24 196.061 12C196.061 11.8 196.101 11.48 196.101 11.08C196.101 10.12 195.901 8.8 194.141 8.8C192.901 8.8 190.861 9.36 190.861 10.4C190.861 11.24 192.421 10.84 192.421 13.64C192.421 17.16 188.661 31.92 188.661 32.8C188.661 33.56 189.301 34.12 190.741 34.12ZM198.501 24.96C196.581 24.96 195.621 23.16 195.621 20.64C195.621 16.6 197.981 11.28 201.381 11.28C203.101 11.28 204.021 12.72 204.021 15.2C204.021 19.32 201.981 24.96 198.501 24.96Z"
            fill="#064A3E"
          />
        </svg>
      </Link>
      <Link href="/cart">
        <div className="pre">
          <svg
            aria-hidden="true"
            className="pre-nav-design-icon"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="28px"
            fill="none"
          >
            <path
              stroke="#112926"
              strokeWidth="1.5"
              d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
            ></path>
          </svg>
          <span className="pre__jewel">
            {quantity > 0 ? quantity : 0}
          </span>
        </div>
      </Link>
    </header>
  );
}

export default Header;