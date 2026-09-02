const { useState, useEffect, useRef, useCallback } = React;

// ---------- Lightweight inline icon set (no external dependency) ----------
function Icon({ children, size = 20, color, fill = "none", className = "", strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill !== "none" ? "none" : color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color: color || "currentColor" }}
    >
      {children}
    </svg>
  );
}
const Plus = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
const X = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
const Radio = (p) => <Icon {...p}><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5.5 5.5a9 9 0 000 13M18.5 5.5a9 9 0 010 13" /></Icon>;
const Users = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></Icon>;
const Layers = (p) => <Icon {...p}><polygon points="12,2 22,8 12,14 2,8" /><polyline points="2,15 12,21 22,15" /><polyline points="2,11.5 12,17.5 22,11.5" /></Icon>;
const Droplet = (p) => <Icon {...p}><path d="M12 2s7 7.5 7 12a7 7 0 01-14 0c0-4.5 7-12 7-12z" /></Icon>;
const ShieldCheck = (p) => <Icon {...p}><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><polyline points="9,12 11,14 15,10" /></Icon>;
const ClipboardList = (p) => <Icon {...p}><rect x="5" y="4" width="14" height="17" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="16" y2="15" /></Icon>;
const Play = (p) => <Icon {...p} fill={p.fill || "currentColor"}><polygon points="6,3 20,12 6,21" /></Icon>;
const Square = (p) => <Icon {...p}><rect x="4" y="4" width="16" height="16" rx="2" /></Icon>;
const Check = (p) => <Icon {...p} fill="none"><polyline points="20,6 9,17 4,12" /></Icon>;
const AlertTriangle = (p) => <Icon {...p}><path d="M12 3l10 18H2z" /><line x1="12" y1="9" x2="12" y2="14" /><circle cx="12" cy="17.5" r="0.5" fill={p.color || "currentColor"} /></Icon>;
const MapPin = (p) => <Icon {...p}><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></Icon>;

// ---------- Theme ----------
const theme = {
  bg: "#0a1530",
  panel: "#0e1c38",
  panelAlt: "#122a52",
  border: "#223a6a",
  borderSoft: "#1a2f5c",
  textPrimary: "#f3ede0",
  textSecondary: "#8fa3c9",
  textDim: "#5f7aa8",
  red: "#a72b2a",
  redDim: "#3a1f1f",
  amber: "#d98c2b",
  amberDim: "#3a2a16",
  green: "#3f9142",
  greenDim: "#16311c",
  blue: "#4a7fc0",
  blueDim: "#16305c",
  gold: "#e3b23c",
  goldDim: "#3a2f14",
  purple: "#9b6dd6",
  purpleDim: "#2c1f42",
};

const mono = "ui-monospace, 'SF Mono', 'Roboto Mono', monospace";

const CYFAIR_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCADqANwDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAEHBQYIBAIDCf/EAEwQAAEDAwIDAwcHBgwHAAMAAAECAwQABREGIQcSMRNBYQgUIjJRcYEYI1JWkZOhFRZCYoLSFzNVY2VylKKxwdHiJDRDU3OSskbC0//EABoBAQACAwEAAAAAAAAAAAAAAAABBQMEBgL/xAA3EQABAwIDBAcHBAMBAQAAAAABAAIDBBEFITESQVHwExRhcYGRwQYiMlOhsdEjUoLhQlTxM2L/2gAMAwEAAhEDEQA/AOdcVNKVdLTSlMUzUomKbU60xRSmaVNKIoxU0pRQlKUoiUpTFESlTilEUYqcUpREpSmaIlKb0xUomaYpSiJilKURKUpRF80qcUqFKjFTilKKEpSlESlKURKUxU4oiipxSlESlKZoiUpTFSiZpvSlETFKUoiUpSiJSlTiiKKVOKmiKMUxU0qUXxSlK8olKVOKIopippRExVrcOeBcnVtr/K15lv2uI8AYqG2wXHU/TPN0T7O89enX08GuEBvy2dR6gYItiTzRoyx/zRH6Sh/2x/e93Xc+MHF5Okm1WGwOoN4UAHXQAUwk+zHTnI6DuG57hXMYlissk3U6D4t53Dnf5aqzp6VjWdNPpuHFeH5M9k+sV0+5ap8meyfWK6fctVVX8L+vfrRP+xH7tP4X9e/Wif8AYj92sHVMY+eOf4qeno/lnnxVq/Jnsn1iun3LVPkz2T6xXT7lqqpPF/Xg66pnD38n7tBxf14RkapnEeHJ+7TqmMfPHP8AFOno/lnnxVrfJmsn1iun3LVPkzWT6xXT7lqqq/hf179aJ/2I/dr1xuI3FCa0Hot3vshokgLZjc6SR13CCKdVxj/YHP8AFT09H8s8+Ksr5M9k+sV0+5ap8meyfWK6fctVW7nELimy2px256gbQgFSlLiEBI9pJRsK8X8L2vT/APlE/wCxH7tOq4x/sDn+KdPR/LPPirV+TPZPrFdPuWqfJnsn1iun3LVVSOMGvD01VOPu5P3an+F7Xv1on/Yj92nVMY+eOf4qOno/lnnxVq/Jnsn1iun3LVPkz2T6xXT7lqqq/he179aJ/wBiP3a/SNxl17HkNvHUcp4IUFdm8hCkL8FDl3BoaXGPnjn+KkT0fyzz4pxJ4Z3Dh9cEBS1S7ZIP/DzOXGT3oWB0UPxG478abiusdMam0/xh0m/Hkx21FSQ3NgrV6TKu5ST1xndKh/jXPvEfh1P4f3bsXCqRbnyTEl42WPoq9ix3jv6it/B8XdM40tVlK36/3/0LFV0oaOlizafotRpSldDZV6UqM03oimozTFTRF84pSleUSlM03qUSrY4OcIlaodbv99ZKbO2rLLCtjMUPb/Njv+l06ZrzcH+Eq9YPpvV5bUiyMr9FB2MxYO6R7EA9T39B34s/ivxTi6BgCzWYMm8uNhLaEgckJvGAojpnHqp+J268xi2KSPk6jRZvOp4c7+HerOlpmtb083w7u1fjxd4sM6Limx2RbZvK0AEpA5YKMbHHTnx6qe7qe4GpuHvBjWHFQu3CAhpmF2ig5cZzhCVudVYwCpZ9pG2eprQ5El6XIckyHVvPOrK3HHFZUtR3JJ7zXW/DZJ1d5L79qty1sSmYMyHllRSrtUKUobj6WU5/rGs9DQMoYtlmZOpWGeodUPu7TcFVOsvJf1NpbTsm+RLrb7yzFbLr7UdCkLCAMqUnOQrABJGQdqz3DPhDw+4q8OpbtoVMh6oYb7N4vy1LSw/jKVhGwLS8ezIyR1FVvpTjZqrRmj5GmbSuCiHIdW6XJDPaLQFpAUhOTygHBPQ7k1i+HGv7hw11NGvtuJW2gdnJj82EyWP0kHx2yD3EDxqwIdbVa123V4+T3w1t9gsuqdR63ssVS7e+uN2c1lLnYJYSVOqSFDG5IAI6hNc63+8Kv17n3ZxttgzZC3+zQkJS2FHISANgAMD4V2D5R+oXkcFnpVsGGbs5GacX0IZc9I9PbhKT4E1zVwq1/ZNAzrjKvWlo2okyWkIZaeDeGVBRJVlaVYyDjYd1eWEm7lLgBYLRAtJOApJPsBrsLyep71p4BSLgwEl6KZ77YWCU8ySojI9mRVM8RuOVr1vpd6wQNC2+yh1xtwSWnUlaeRQVgBLaeuMde+ro8ny4rs3AB65NtocXE/KEhKF+qooKlAHw2pISW5hSy11Td48qHXV+sc21TIllSxPjLjuqbjOJUErSUnBK+uCa2nyR9LsGRf8AV9wQgRobIhNLcTlIJHO6r4JCB8TWkcRPKAu3EfTBsk6w2mCyp1uQXoxXzgo3xv3V0DpDh1dYHk9jS9pcjRLzdoC1uOSCpKUuSN15wCchB5enUCofk21rXRuZVf8AleWWGmLpe+QWGUIdU8wtbSAkLCkpWgnA32Cq1DyaOHtj19qG9I1DbUz4MSEjlQpak8rq17KBSQc4Sr7atjyi9PSk8CremYG1zLO5CU8ts5TzBPZLIJxtlVY3yPLaI2mNR3dwBKX5rbPMfott8x/Fw1AdaNSR76pDVOj7fI4yS9IaeZXGhquyLcykrLhRulKzlW5wec7+yrO1B5HtyYUr839Uw5SsFSWJ7JaWR/WQVA+/lFYDyf4KtZcdn726ntG4y5d0UT9JailH4uZ+FW9xK4W6y1fxe07qG3S40Sz20MpLyJKkPICXCtz0QN+bZPXHtqXPIIF1AaCLrmd+HrDgxq9vzuM5brkyOYJUeZqS0TuMjZaDjHgfYRXQ1jvenOMukHWXmErQsBEuIpXzkZzuIP4pUOv2itX8sa8wJFy07Z2i2udFQ/IewQVNoXyhKT7M8pOPCqL0nqy56MvTV2tbvK6j0XG1eo8jvQod4P4HcVW4jhvW2CWP3ZBoeeQtmmqehcWOzadVkuIXD+46AvBiScvQ3iVRZYThLyfYfYod4+I2rVsV1pb7hprjPo1aFt87LmEvsEjtob2NiD3EdQroR8RXN+u9DXLQV6Vb5w7VlzK40lIwl9GevgR0I7j4YrPg+LmovT1GUrde3t/PmlXS9H+pHm0rXKUpV+tBKUpiiL5zTFKVCJilKURdWcFnVO8LLT2Z9NCH0DwUHF4/yrlmdKkzpj8qa84/KdcUt1xw5UtZO5JrpbydpYkcPwyTnzae8gjwPKr/APauctRQzb9QXSGRgsTHm8e5ahXIYSA2uqmnW/qVa1hvBEez8LH1015HWokljUOm3XBkLbnsoJ6gjkc2+CPtrmXvA7zsPGszYRqG1NO6nsi5kRFtdQ05OjL5CwtzISknOfSwR0x7a6F7doWVa02N10Vwp4HXjS/Fe9y7xYYD+nEpfTEfldk6FczgU0pCTkghOQSQMb1SvG+VZ53FPUL1jW05BU8lPOzjkUsNpSvlxtjmB6eNbjeGuIeqtAC7zuJDs0PWtd2/JCA42XYjawh0laUpQpSSd0nNYGDoe2SODydTwdPy7ncC5KYmS1XENM27sykoWlrA7QlKh6OT0PwxtyNyV6Olgt+1ZxY0fqDyeYumXruleoE2+K2IqWVkpdaUjYq5eUbJPf31zoFJVnlUk49hqVKKAVD9EZHwq/uNaY940xfHEQoLabTOtT0JbMdtpTMaVEypvKQMguAnfNehZuXFQfezVDqhSkMB9cWQlk4w4ppQQc9PSxirj0fxmm6J4SPaXf0dcHo0xqU23dFLU2ye25sEZRg45u5W+K/PitcHpPDzRaEXLUS0OWOCtyGhGbaAnnRzqVnZ3IAxjHTevVqrWUOycILBZHFXWRKvemmY6I5WkQmUokqV2xBOS7tyjA6Y3qCdoC4UgWVP2pnzN6Fc5tukyrWzJbDvKkpQ9ykFTYWQUgkD8elWfxn44O8T7XaGINnn2eLDeW84pTvMl1eAlISpIA9Ec321n59lbY8mpFrU7EEpuMxqJUftP+IHaSlJ5yjGyOzIAPtBr36blM2nyfmS5JkP4sl0kuWlKElqSHZIaS8snp2R9IYGdzvQuBzQA6LENccNMTuBLmgrsq6flnzBcdLymgttbgWVNnm5ubuSCSKzvCfibo/SHA+4Wty+xmb8pma/5msKSsuqCg2kEjBJAR0NV9pDUMuy8F9SPFi3yA3c4sOH51Cae7NTqVqeIKk5yUgd+2NsVtXDDhDYtX8MrVJnMstz5N47d2UVlLot6FhtaQf1lAgd+VVDgAM+KkEkrYfI5tUePbtQ3d11nt3FtREJKxzBCE8yjjrglY3/AFa2LycdaO6xu2vlPvuLQ9dBMYSpZPI05zJAT7BhCelUc1w/tFz4qartNvlzrVY7C3MkLkRwX3m22MJwMnKiVkjGfCvy4eydT2TXMm3cK715+4/HKy9IiJYS82hPOUrQ5nlKSSOu56Heoc0G5QG1lpOposmDqO6xJjrr0mPMeZcceUVLUUrKckncnasbWb1i9eZ97dvV9heZyrwkXEYb7NDqHOjiRk+iogn7awnjWYaLGVYfAaXLY4kQGI7622pDbqZCAfRcQG1KAI8CAR7K3Dym3h2unWO8JkOfigf5Vrfk7RDI4gqfxtGgvL+KilI/xrI+UnK7XVlrjA/xEDmx4rcV+6K5/ZDsbZbc30P5Vk02ondp/CqKmKmldcqtKUpmiL4pSpxRFFKnFTRFfnkyzua136ATu2+0+B4KSUn/AORVYcXoH5P4k39vGA5I7dPuWlKv8Sa2vyb7j5trKdBJwJkFRA9qkKCv8Ca/Hyjrb5rriNNAwmbBQSfapCik/hy1yLf0sakb+9t/t+CrR/v0TTwK/PgBKDuorpZGZDdvuVzgLFuuQiofeiPt+n82FDqpAWMDBJAxvXm4eSrfOu2r9Km4rct+oLfITHlTQlgqkMkvMuLBOEkkKGM99aFaLtNsV0i3S2vqjzYjoeZdSAShY6HB2PuNeeQ8uW+6++Qtx1anFkgDmUTknA26mr8tzKrrq3dE8VLLbeGDOlb85IdjuyZUSVFjtZe8yeb5w42vYBSHh6pICgTsa1PTuu7VadJy9M3jTSNQxFXEXGN20tcYNOBstkkI3ORg4BA99aXSmyE2iisKJ2wDnb2VsV84hap1HaItmul4eft0RLaWowQhCByJ5UZ5QCogdComsraeH9qc0xBv1/1U1ZW7i44iIjzNx8K5DhXMpPqnPd7K9MXQuijJaQ7xATPLiglEa2W11b7pPRICtgT41qmuhuRmbZZNJ07bWWUQPtu8wtfgXfV+oYjGlINxvM6IoBDVrbfWprAOR6GeUAHfJ2FWXafJm1vfoUddyubEdDTfIyyorkdinOeUHISBknZJxW8+TXP0tdb7d7ZYLCqLDhxm3TLlr55MpalkZXjYJAGyRtXRoAAxWu+SokOXuDwJ9QPqsrWRtGfvH6LjDVXAfiNp2O69Hnu3VpUcRltsvOIcWyOjfKo4UkdyQT4CqzRqLUFtQuCLlcI6W4zlvVHUtQCGFqytkpPRJVuU+2v6MuNodQUOJStJGClQyDVW8SOAenteKMrszFnAYEhkhLngDnZY8Fb+w0bPNEf1Pfb2DMeGh8LHsKGNj/hyP0XGSb9ckWFdgTJIti5SZqmOUYLwQUBWcZ9U4xnFbPp7i3f9PrsTTQZXb7QlDfmacoTKQh8vgOK3Oe0wcjGcAEVZTvkiXgPlLd/R2WdiqJ6WPgvFVrxT4XSuGNyiRX57c1uUhRSsI5FJUkjmBGT9Ibg1nZWwyODBe54gj7hYnQSNG16hZHh5xCt1kXqp25XG82m534o7K7WxpLq4nzxdX6JUknmJA2PQVsHAPUVts+o7jc59yadut3uEe2NduoJcUy66VvvkHpkJSM9xVVL0O4wdxW2WA3WIOV0Qp41N5RXnNukJi2izuKb7UJCkNW+I0UL2IIwpKVDp+nVZay1Kzqy/P3Riz220tOEhDEBjskFPMSlShnHPggEjGcdK8Vsvdyszc5u3y3IyZ8ZUOSEY+dZUQSg7dDgdK8NA2yE3V3eTJA5p1/uBGyGWY4PipSlH/wCRWqcdZ3nnEq4oByIzbMf4hAJ/FRq0fJvtnm+iZUxQwZ09eD7UoSlI/HmqidbXL8saxvc8HKX5ryk/1QogfgBVFhg6XFp5P2i32/BVjP7lIxvHNYXNRmmKnFdaqtRTFTSiKKUpUWRKVGaURbdwnugtHEWxSFK5UOSPN1n9VwFH+JFWl5TNqLtmst1Cd48hcZZ9gWnI/FB+2qDjyFw5DUlo4cZWl1B8UnI/EV1PxTjI1bwnnS2Bz5itXJrG/q4Wf7pVXKY2Ohr6ep3H3Tz4q0o/fp5I/HnyXKVKUq+VYlWDpzhMrUGmolzVfokKbci6LfEeQeV/kOCFOZwkk9Biq+q3YzbieF2kmlgl1x+Y40kdSguADHvNVeK1EkMbTEbEm30J9Fa4PRsq6jopNLFa/py7nTL07Q2uIj7VmlOYebWPnLe9+jIb8PbjYjfffOd0XKhcFNdPu6qt0O6RGWPO7dIbjBx2SvIDS47hICBgkqySBj24NZ6/2szmmdN8RYUiDKbTiDeOUKdYGcYUobON52O+3gd6wDMJu26KLGspjE6z2+Q6m0tttq7Z9S2VFpSFHB7BRBIT4ZJwADpQ1nvFxFifibxO4t7eI/FzmrMOfTkNJu3/ABdusslpzWd6ia4vt34d2mLGtMxBbjmPb0tNdk2O0IWVnHaJCjzHJ36bYrev4RuKTbnZy79peAvnQ2UyOQFJKOdWfR25E4KvEgDeqI1RxLvOoXXGoyhabcVOdnDh+gEpWEgpKhgkEIT7B4V+PDnS7Ws9WsW+aVGOpK1vLJ3yRyp3/rqT+NbE0Uuy6eV2wANBc+oCwxVQAEMbQe2wz8wVe6+JnFcRTLYnWSaylvtVGMlvmSgnCMpUB6S+qUZKvCsS/wAeOIMWWuHLlMxZbfrx34CUOJ2zuk+BFUDmfp+5rbbeeiTYbykFbSyhSHEkgkEdDkGt0sfElE6O1aNYsifAST2UoBQciqOcukI5S6vfqTn31jmpKhrdpjtodl7/AHN/p+dukxSFrrTRNI7h6D0VyWLjJq9UKXfb7do8exwB88tERAW+4fVab/WJ+yqada1Lxu1ZKuK+WPGa/jH3lYj29nOQCrvPfgbqOTWz32xOXqdabbfb0xA0jDimRDWylAen9OY8iVKHbEKG57skDqB+d41EiTCas1oiJtdjjn5qG2d1n6bh/SUfGtBlS6IbQO086Hc0epO/hoe2xbQHE5iY27EQ7NVpOu9DN6QFtkw7si6QLi2tbL4aLSsoVyqBSSdsnY1qlWVxXSpemNEvIHzIiSGif5wOgqFVrV9hsz5adr3m5z+hIXN4hC2GpfGzQFKZA3PQUr2Wa2uXm7wba0CVy5DbA/aUB/nW65waCTuWmBc2C6k0cgaN4PQ33AEKjWtcxfd6akqc/wAVCuU8lW6t1Hc+/vrqLjlcW7Jw1lQ2Ty+dragtgfQzk/3UVy7VL7LsL45ak6vdz91Y4mbObGNwSlKV1NlWJSlMURfNMVNKhEpSlESupeDFxb1JwxiQpBC/N0u254H6O+P7ihXLVXV5NV87K4XexOKwH20y2h+sn0VfgpP2Vz/tNTmWiLxq0g+nqt/DZNmax35KnLrbXbPdJlteBDkR9bCvelRH+VeWrI4+2L8kcQHpaE4ZubKJQPdz+ov8Ug/Gq3rao5xPAyUbwtaaPo5Czgs1o/SsvWV/j2iIoNheVvPq9VhpO63D7h+JFW7+dFpg6pgSY8Nx+02JjsbcyMYUpCT2a157ivCj37Cte0WyLBwyk3Focsy/TFRO0HVMdoekke9ROayenH2Iml9VuLdaS+/GjxWkKUOZYU+FKwO/ARv7M1QVtQZqgjcy9u8an0/6u0wCgbHTGoeLl+XgTb1XjaS9rTUw8582jB9SpUpSWylhONzzDPoBxeEk56rNaHrjU51XfXJLKFNW9gdhBjnHzDAJKU7e8/DA7q3WG8qDpLV9yayH0R2oYUhYJShzZQW2eqFcw9IbpUkVr2itU6fhobt9/wBPWeQgHCJzsXmUPB3ByR+sNx3g1nobsDpw3aI3DXMXJ+yq8cl6Wp6G9gMhwyy+91pWDVu8Erd5q5FnKThc6chCT/Ntn/Naj/61tcVrQuEGXoW0KQtIUl2MApK0/STk4I9xrYLbC07LuNtd082YKYS0lcTsilsI5iSQdwDknv3z7ar8SxoTwmJrCL63ssVHhzopBI43VOcedPfkXX8iU2jlYujaZacDbn9VY/8AYZ/aqusGus9SaQla2lsvT4dpERgERxIbD6wDjJ223wNgcbVgr7ojh/om2m46jbt/Z9ENNw20reV9FCdyo/gO8istBj7GRMhc0ucBbLesNRhpLnSBwAVWcNbmm8QpWipzykMyQX4KklhHZPp9Ldbgzg4zgKHeO+tv4cWyBdJd1h3SJG/KDMNx1gSkuONNOtK+dBQ2crITzEAZ3SOtV1cNXwpeqrfPslhg2WJEkoU00w0lTjg5gCXFK2USM7eqM/GrNtVglTOLT1ptVwcssh10utvojKjqjlTBUocgO2cK3ScHmyK2aqO0ofs22s7duh7N48VYYJUkNkh27C2ue7P8+Cx7dn/OzT8zRUnmYubDpmWpT6C2S5y+k0Qdxzp3GfbVMPMuR3VsvNqbdbUULQoYKVA4II9oNXbrDTF10dItE6dOdcuU5oy1Fee0YcSvGCoklR6HNafxmhMqvtu1BHbDab7BRMcSkYAeB5HPtIB+NesLmdFMad2hzHYf7Ga9e0VIxzW1sRuDke9V/VicBbL+VuIkWQpOWrc05LV4KA5Uf3lfhVd10N5NVhMexXO9rR6c18R2ifoNjf8AvK/CtzGqjoaN53nLz/pc9Qx7czRwzWJ8pa9c82y2RCtmm1y3B4qPIn8Eq+2qTrbeK18Godf3eWhfMy275s0e7kbHL+JBPxrU6scHpur0ccZ1tc95zXirk6SZzlGKnFKVZrWSlKURfNKYqa8oopippRErZOHOoPzY1tabmpXKyh8Nvf8AjX6KvwOfhWt1BwRj21jmibLG6N2hFvNemOLXBw3Lo7yjdPflDSUa8Np5nbXIwsj/ALTnon4BQQfjXN1dZaNmMcSeFjLEtQUqVEVAkk/ouJHLzfglXxrlSdCft02RClJKH4zimXEnuUk4P4iuV9n5HMY+kk+JhPl/26scRaC5srdHBWhpdwXjhQhpn0nrHcXC8gdQ08MhXu5gRW36Q0jZr7oa6XF6OpdwjGSkLS+oOApZDjYbbGy84XzA9wyOlU3oTWDujL4mYW/OIL6DHnRT0fYPrD3jqPH31cNssU1rU7Vms1+fiW2cgXSE8yCpx9KW1FIQBjLvKVpAyAe/rWGqg6GpNxcPuR37x5rpMHrulozAHbLmZ79PBacloTdCasjcnMpnsJiSYxWE9AcOJ3QTyEYV6JA7jVW1cNvxpvVbkS4srYjSErgSUy3VsFtte6Svss4PQEYIHOarHUthf01epVrkYJZWQhac8riP0VAkAkY8OoNbuEyW2oz3+h+31VR7QQFlSXjQ5+ef58luHBb8oXfVTFhDhXa3EuPyWlbhtKR6yD+iokpGR1zuDV3TblFi6htlhtbaGYzEpCn+T9NzOwJ78ePf7qrLgqlOm9M3rU6y23IkqEOM46QlLaEek44SegBKR4kAVrd/4mOx5HJpx1aHUL5lXFafTUc5+bSfVH6x3PhVRX0j62tc2EZNyvuvxP2U0k7aenDpDroFe18cuOk7miRAdAt0xeFNODmbacPsHcM77eNcv6ovd5v16kyb9KckTkLU0vm2DfKSClKeiUgjoKvDRPGa162g/m9q3soE59PZolD0WXldx/m157uh7iOlVbxb0+/YNYvh5HKZaEv5A2Ur1Vke8jm/arLgcLqaodDO2zrZHjbgedFixCQTQtkjOQ1Wp26MqZcIsZAJU88hAAQVndQHqjr7u+rscuc2HxMfetMJM2U2hMNhhl1TyHOZgp+aPUJw5zBP6O46CtC4WWdpy6v6hn9q3brM0ZK3G8hYWMBKm/pKQpSFEe721uegrtFj6q/LV5nIt0lbi5RWGCphTi1fONrSkEhBQpadu/G9b2IyB04aDp9yQfT6rc9n6dx25dm4AOXHK3fnc+S+dYaivt+kxod9jKRcYJdQvmQUOLUtQVhSe7uAxWt8Z3kxbhY9PhQU7Z7ahuRg+q64edSfgMfbW4v3WDY27trmQXprMeQYllZlq5lvLAw1zZ7m0BP2eFUjPnSbpNfnTHlPyZDinXXFdVqJyTWPDIXSzmc6Ny7z/QWf2irGCNtIwWtmezsX4pClEJSkqUTgAd57hXWiAjhhwoAOEu2237/rSFD/APoqqA4Oaa/ObX1vbcRzxoR89fyNuVGCkH3q5RVneUjqPsLXbdPtL9OU4Zb4H0EbJB96iT+zUYqOt1kNENL3Pd/y/mqWj/ShfMe4KgSVKJUolSjuSe895qKUrslVpSlKIlKUoouopUZpUIpqM0xU4oiimKmlEVzeTfqYRrpcNNvLwiWjzqOCf+ogYWB704P7NYfyg9Lmz6xTd2UYjXdvtCQNg8nAWPiOVXxNaFp69yNN3yDeIue1hvJdA+kB1T8RkfGul+KFiY4hcOFybaA84hpNxgqG5VhOSn4pJHvArj8RHUcTZU/4yZHv5sfNWsH69MY97cwuU6uO13GUxw60ZdGnS3NgyZLTDg6hKHApP2GqcBzuOlWnprXekI2irVBvbE96ZZlPqbhNI+bmlauYFTn6IHQjw763MXje+NnRtJIdu7ismCVMdPU9JKbNsVsdx8yvrTuqdSRYFgsCVL+bhtcq5q1KKlIRk8y1E59LoO7GNsG2I3FKyFM2PcIkmPJMW2XOQXZKpGcqTHWpSghJCcZPfjI3yDhoTd84zamXJukpMK1QEc77iByx7fHH6CB05jjA7z1OwqwbPaWOIN0a0/b4bkbS9pYUpEVspSpY6JyV+iXXF4AKumSe41VFjoXht7ynPLRv5J39nDJWxLsSvIRswsG9VBqlvUtoiRbDeELYgwCW2UNEGOteSpSudPouLyTvkkdMCtcq+moV6bl3a2W2XA1HZbWURgq5OoSA0cjs2HFHlSpWFDICieXY4xWBetunXoCbxM4dymWHFuBL0R9SIqnAMIaScjCR1UfWJHdVlDiOwLOZ5W8dbeqrJ8GnDvdz07e7t04gKoz036eNbzYLFqPX8a2xbnKUxZLepIFxlj/l2XFhBCVK9dIUnYZwCDuBtW3w7TCtVxhRrXw5X5652T8c3ZZCn0NpK1KCTn1lDOx9VIHU1lYmn7jqW4zLRqK4BUqLbm5ESDHcQxFkJ/jQpSjkEJDhc3BzggYxXmavdJYRtsdxNiR3Ab/HzXqnweU5yGw1Pdfz51CwEi7WC2OWbTV0gXC16cdiplMzOTBckqSEGQfptEpBx7SDjAFfnftPS9PyUIfKHo7yeePKZPM1IQeikn/KvbBRC1ZZzo+9vob9Irtc87+avHoM97a/8/dWs2DVlw0DMlaQ1bAcl2hDpQ/DUfnIqv8AusK7vbjoR7Kq2xGdpMfxjUcRxHbxV1HUyYPP0UwvG7Qr08VnFM6X0VDRswqLIlEdxcU4AT9gqta3niZqexXuPYrZYXZcmPa2XUGTIa7NSytYVyhPhjrWr6dscnUt8g2eID20x5LQP0QeqvcBk/Cr7DgYaQdILWuTfvJXMYjIJqt7mG4JyV/+Tppf8maYkX19HK/dHOVonuYQSB8CrmPwFU7xO1N+dmtrlcG180ZK/N4//iRsD8Tk/Gr/AOJl6j8PuHC4tuIZcUym3QkjqnKcFXwSCffiuV8Y2HStP2ejNRNLiD/8jYd3Nh5r3XERsbTt3ZlKVNMV1iq1FTinupiiJTPhSpqUXxilKV5RKUpSyJSlMURK6I8nbV35QscjTchzMi3HtY+T6zCjuP2VfgoVzxis5orU7+jtTQbyzlSWF4ebH/UaOy0/Z+IFVmMUHXKV0Q11HePzotmkn6GUO3b1leL+jvzO1nKaZb5IE3MuLgbBKj6SP2VZHuIrSa6o4t6UZ1/oYTbZyyJUVHn0JaN+1QU5Ugf1k7jxArlfrVbgtb1mnAd8TcjzzmsldB0UmWhzCtLSmstIt6Di6fusy52t1l9x6QIcUOiaScpUpWe4bYPsrL2PWmh7fIxa9U3+1rUclcuClbCjyqSCpKSegWrB7s1ULFqmymg6wwpxBJGUkda/RdjntMLfdY7NCElRKlDpXiTD6YyOd0hBJ4jXyVpT1eIshDGMOwB+3KyvB9tWntAy4MYibCuEhLyLpBLb0Z9ISEpbWFDmbKfSII3ya8V0vdue4fW+1NXGS9cGXQewLakJaRlalIUfVWkLKVIPrDmXmqs0lre8aMlLctzyFx3tpEN9POxIHsUn2+I3rdW9b8PbqO1m2u+WV87qRCUh9nP6oVggeFaU9HUwmwG0LWuNfEfhW9DjtNJbrHuuvfsJtZbXqrV0JzUVt1DabpLmPtSvPTGeQUNRf4slAz3qUlfNjIxivXdH0uTbZqvztOkbdAZSzFk3BYW+9yqUUhDaR6YCVcg23SkZzWjPcR9I2Ec+nbDLuU0epJvCkhts+0NJ6n3mtCvd/u+rrt57dprkuU6QhKlnCUAnZKQNkp8BXuGiqJiS/wBxuvb4cPHyWKrxqCMNjpBtEC1zwO629WZcdU8P7jOcfnaj1LMkuH05RgJ5VbY2BOcY2A7hWtcVNWWXU71oRaXJUxyDGLD9wlMhpyQObKUkd/KM7n21qrmn7m2ceaqV4pIIryyoUiEUpkN9mpQyASM4rdpqKmZKJGPJd3hVFfU4hJFsVDCGj/5tZfhV6eTho4kzNWSm9t4kPI+8WPwT/wC1U3YLJL1Jeodogp5pEt0No9ifao+AGSfdXUmq7rC4UcOg3b+VKozKYcFJ6rdI9Y/3lmtfHahxa2jh+OQ28P7/ACtXD4htGZ+jVTfHfVo1Dq822O5zQ7SCwMHZTx/jFfDAT+yarWvpalOLUtalLWolSlKO6iepNRXS0dK2lgbCzQBaM0pkeXneopipxTFbSxpTFTUZoinFKilEXxSpxSoRRipxSlESlKURKUpRSugPJ61v55b3dKzHfn4YL0MqPrNZ9JA/qk59x8Kr/jboT80dUKmxGuW13Qqea5Rs051W39p5h4HwrTbHeZmnrvEu0BzkkxHA4g9x9oPgRkHwNdR3GHaOMfD0dkpKETG+0ZWd1RZCe4+45B9oPjXG4gw4ZXCrb/5yZO7Dzn5q2hIqoOiPxN0XN2mWltwpDqnU8rgPKjIyMA71uuh+Go1tZ5Koyn0OsGG2pplKlc6Xl8ilkA9Ej0jt0z0qrrnbZVnuMm3TmSxKjOKadQeqVD/L2eFbxo/is5pSI5FahkpdciOLVzHOWHOdIBBGATseu1bk9M8v6VhuDnl3Zd6taHE4jB1d4DS0WG1ne5z1GWV1l2OCKJguSkXiLFTDnO25vzhwp85eQlSyEnlITlKTgqI3OKxEnhSIunod8evMVpuaha48ZS/n3QlfIrCeXGx8elbDB4vafej3Ji8WcTWpdxcujbSnFIQh5aFJ5VjlPMgc2Rgg5ApK4nWSboS3abVJnNuQQvZLiPN31Kd5+ZaSnmyASBg1gMlS0b/I/hbbaehe4XDLXG8DKxvoeNt39eJzgPMY1Bb7C5d4JnTXSyW0PZMdYQF4cHLkDB2IyD3GvXB4Isi8+au3JT8dFs/K6ZMNC3VOsZwORvCVFee44rMOcatNsXbTs6JDlLTZnXFjzmQHHS2pHKGEucuShJyQVZO+KwsrjHaheYs1i1KcixLcm2MR1PuBwNjPp9qjlIXudxtg4xXovndln9fwsbYqSPMhgy4tOdzxJ3W7FjdX6WRpDVLtpLvnDkSV2ZfPMCsFsq6EnHUbVpGpGVouSnC4HEuAFOCPRx3VlNca4d1rcZVwfYDT8l4PL5dkjAwABvsBjv7q++GehndeamZgkKTBZw9NdT+i2D6oP0lHYfE91ZYY+rg1EpsBfXgtPE8QjqGCliFybG4yF7WOVla/k8aFMGA5qya1iRMSWoQUN0s59Jf7RGB4DxrRuNetxqzVKokR3nttsKmGiDs45n01/aMDwHjVtcYdas6H0qi1WwpYnzW/N4yG9vN2QMKWPZgeiPE+FcxdKw4DTvqpnYlMNcmjs5y81WVrxEwUzPFMVNRmldaqtM0pipxRFFMVNKImKUpRF8UpSoU2SlKURKUpRQlKnFNqIoqy+CfEIaSvZtdwe5bTcVgKUo7MPdEr8Aeh+B7qrWmB371rVdJHVQuhk0PN1khldE8PbuXTHFTg4jXk1i6W2XHgXFKeyfU6glD6B6pPLvzDpnvHuFaH8me//wAvWn7t3/SsJaeOesrRbY8Bt+E+3HQG0LkR+dwpHQFWRnA2zXs+UJrb+if7J/urlYcOxinb0UT2lo05srN81HIdtwNyvf8AJnv/APL1p+7d/wBKfJnv/wDL1p+7d/0rwfKE1r/RP9k/3U+UJrT+if7J/urL1XHP3N58F42qLgV7/kz3/wDl60/du/6U+TPf/wCXrT927/pXg+ULrX+if7J/uqPlC61/on+yf7qdVxz9zefBNqh4FZD5M9//AJetP3bv+lWnpXTln4QaKfXLkIV2STInS+XBeX0ASPZ0SkePiapz5Qmtv6J/sn+6sDq/ifqTW8NmFdX46YzS+07KO12YWruKtznG+PfWOTCcTqy2OqeNi+dv+L22ppYbuiB2ljNY6pmay1BKvEzKS6eVprOQy2PVQPcPtJJrC1OKV2EcbY2BjBYDIKqc4uJcdVGKmlK9rylKUoiUpSiJSpxSiL86VNKhFFTilKIm1KVNSijFTTFTRFFMVOajNEU9KjNKYoiUpipoijFTilKIlKUoiUpSiJSmKnFEUVOKUzRExSozSpRTmmailEXzTFTSoRKYqaURMUzUGlETNKUFESmKmlESlKURKUpREpSlESmKmlETFKUNESmailTZEpSgoiVOKUoiYpSlEX//2Q==";


const STRATEGIES = ["Investigative", "Offensive", "Defensive"];

const SIZE_OPTS = ["Small", "Medium", "Large", "Mega"];
const HEIGHT_OPTS = ["1 Story", "2 Story", "3 Story", "4 Story", "Other"];
const OCCUPANCY_OPTS = ["Residential", "Multi-Family", "Commercial", "Strip Mall", "Big Box"];
const PROBLEM_OPTS = ["Nothing Showing", "Smoke Showing", "Fire Showing"];
const SIDE_OPTS = ["A", "B", "C", "D"];

const COMMAND_UNIT_OPTIONS = ["CF09", "BC-07", "BC-09", "BC-11", "BC-14", "BC-15", "BC-16"];
const UNIT_OPTIONS = [
  "CF09", "BC-07", "BC-09", "BC-11", "BC-14", "BC-15",
  "E-01", "E-02", "L-02", "E-03", "R-03", "E-04", "T-04",
  "E-05", "E-06", "R-06", "E-07", "TW-07", "E-08", "R-08",
  "E-09", "TW-09", "E-10", "E-11", "E-12", "T-12", "E-13",
  "L-13", "R-13", "L-14", "L-15", "L-16", "TW-17",
  "E-18", "E-19", "E-20", "E-21",
  "SF-1", "SF-2", "SF-3", "SF-4", "SF-5", "SF-6",
  "RH-1", "RH-2",
];
const WATER_RESCUE_UNIT_OPTIONS = [
  "CF09", "BC-07", "BC-09", "BC-11", "BC-14", "BC-15",
  "EB-01", "EB-501", "EB-07", "EB-507", "EB-12", "EB-512", "FB-11", "RB-03", "RB-08", "Transporter-5", "Transporter-10", "Transporter-13",
  "E-01", "E-02", "L-02", "E-03", "R-03", "E-04", "T-04",
  "E-05", "E-06", "R-06", "E-07", "TW-07", "E-08", "R-08",
  "E-09", "TW-09", "E-10", "E-11", "E-12", "T-12", "E-13",
  "L-13", "R-13", "L-14", "L-15", "L-16", "TW-17",
  "E-18", "E-19", "E-20", "E-21",
  "SF-1", "SF-2", "SF-3", "SF-4", "SF-5", "SF-6",
  "RH-1", "RH-2",
];
const WILDLAND_UNIT_OPTIONS = [
  "CF09", "BC-07", "BC-09", "BC-11", "BC-14", "BC-15",
  "B-01", "B-03", "B-04", "B-06", "B-07", "B-08", "B-11", "B-12",
  "E-01", "E-02", "L-02", "E-03", "R-03", "E-04", "T-04",
  "E-05", "E-06", "R-06", "E-07", "TW-07", "E-08", "R-08",
  "E-09", "TW-09", "E-10", "E-11", "E-12", "T-12", "E-13",
  "L-13", "R-13", "L-14", "L-15", "L-16", "TW-17",
  "E-18", "E-19", "E-20", "E-21",
  "SF-1", "SF-2", "SF-3", "SF-4", "SF-5", "SF-6",
  "RH-1", "RH-2",
];
const NINETY_NINE_BRAVO_ASSIGNMENT_OPTIONS = ["Hot Zone", "Warm Zone", "Cold Zone"];
const GAS_LEAK_ASSIGNMENT_OPTIONS = ["Hot Zone", "Warm Zone", "Cold Zone"];
const LITHIUM_ION_ASSIGNMENT_OPTIONS = ["Hot Zone", "Warm Zone", "Cold Zone"];
const WILDLAND_ASSIGNMENT_OPTIONS = [
  "Division",
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Safety",
  "Staging",
  "Water Supply",
];
const WILDLAND_DIVISION_LETTERS = { Alpha: "A", Bravo: "B", Charlie: "C", Delta: "D" };
const WILDLAND_DIVISION_OFFICER_UNITS = ["CF09", "BC-07", "BC-09", "BC-11", "BC-14", "BC-15"];

const MEDIC_UNIT_OPTIONS = [
  "APP-02", "APP-05", "APP-09", "APP-15", "BC-13",
  "M-01", "M-02", "M-502", "M-03", "M-04", "M-05", "M-505",
  "M-06", "M-07", "M-08", "M-508", "M-09", "M-509", "M-10",
  "M-11", "M-12", "M-13", "M-14", "M-15", "M-16", "M-17",
  "M-18", "M-19", "M-20", "M-21",
];

const TASK_CHECKLIST = [
  { key: "staged", label: "Staged", type: "simple" },
  { key: "onDeck", label: "On-Deck", type: "simple" },
  { key: "investigating", label: "Investigating", type: "simple" },
  { key: "fireControl", label: "Fire Control", type: "simple" },
  { key: "primarySearch", label: "Primary Search", type: "segmented", options: ["In Progress", "All Clear", "Victim Found"] },
  { key: "ventilation", label: "Ventilation", type: "segmented", options: ["Vertical", "Horizontal"] },
  { key: "lossStopped", label: "Extension/Overhaul", type: "simple" },
  { key: "propertyConservation", label: "Property Conservation", type: "simple" },
  { key: "rit", label: "RIT", type: "simple" },
  { key: "secondarySearch", label: "Secondary Search", type: "segmented", options: ["In Progress", "All Clear", "Victim Found"] },
];

const ROOF_CHECKLIST = [
  { key: "roofLoads", label: "Roof Loads" },
  { key: "firewalls", label: "Firewalls" },
  { key: "ventComplete", label: "Ventilation Complete" },
];

const UTILITIES_ITEMS = [
  { key: "electric", label: "Electric" },
  { key: "gas", label: "Gas" },
  { key: "water", label: "Water" },
];
const MUTUAL_AID_ITEMS = [
  { key: "fire", label: "Fire" },
  { key: "hcfmo", label: "HCFMO" },
  { key: "lawEnforcement", label: "Law Enforcement" },
  { key: "hazmat", label: "HAZMAT" },
  { key: "buildingMaintenance", label: "Building Maintenance" },
  { key: "redCross", label: "Red Cross" },
];
const MUTUAL_AID_FIRE_DEPTS = ["HCESD 48", "WHESD 200", "Cypress Creek", "Jersey Village", "Houston", "Spring Creek"];
const HAZMAT_MUTUAL_AID_ITEMS = [
  { key: "fire", label: "Fire" },
  { key: "hcfmo", label: "HCFMO" },
  { key: "lawEnforcement", label: "Law Enforcement" },
  { key: "hazmat", label: "HAZMAT" },
  { key: "epaPollutionControl", label: "EPA / Pollution Control" },
  { key: "railroad", label: "Railroad" },
  { key: "txdot", label: "TXDOT" },
];
const STRUCTURAL_COLLAPSE_MUTUAL_AID_ITEMS = [
  { key: "fire", label: "Fire" },
  { key: "hcfmo", label: "HCFMO" },
  { key: "lawEnforcement", label: "Law Enforcement" },
  { key: "texasTaskForce", label: "Texas Task Force" },
  { key: "k9", label: "K9" },
];
const HAZMAT_MUTUAL_AID_DEPTS = ["Harris County", "Houston"];
const SAFETY_ITEMS = [
  { key: "hazardId", label: "Hazard Identification" },
  { key: "utilitiesSecured", label: "Utilities Secured" },
  { key: "collapseZones", label: "Collapse Zones" },
  { key: "secondaryWaterSupply", label: "Secondary Water Supply" },
  { key: "meansOfEgress", label: "Means of Egress" },
  { key: "sceneLighting", label: "Scene Lighting" },
];
const LCES_ITEMS = [
  { key: "lookouts", label: "Lookouts" },
  { key: "communications", label: "Communications" },
  { key: "escapeRoutes", label: "Escape Routes" },
  { key: "safetyZones", label: "Safety Zones" },
];
const RIT_ITEMS = [
  { key: "assess", label: "Assess" },
  { key: "equipment", label: "Equipment" },
  { key: "monitor", label: "Monitor" },
  { key: "softenEgress", label: "Soften Egress" },
];
const MEDICAL_REHAB_ITEMS = [
  { key: "medical", label: "Medical" },
  { key: "rehab", label: "Rehab" },
  { key: "par", label: "PAR" },
];
const COMMAND_TRANSFER_ITEMS = [
  { key: "confirmUnitAssignments", label: "Confirm Unit Assignments" },
  { key: "canReport", label: "CAN Report (1st Arriving)" },
  { key: "assumeCommand", label: "Assume Command" },
  { key: "strategyConfirmation", label: "Strategy Confirmation" },
  { key: "additionalResources", label: "Additional Resources" },
  { key: "electronicAccountability", label: "Electronic Accountability" },
];
const LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS = COMMAND_TRANSFER_ITEMS.filter(
  (it) => it.key !== "strategyConfirmation" && it.key !== "electronicAccountability"
);
const ROPE_RESCUE_COMMAND_TRANSFER_ITEMS = COMMAND_TRANSFER_ITEMS.filter((it) => it.key !== "electronicAccountability");
const LIFE_FLIGHT_MUTUAL_AID_ITEMS = [
  { key: "fire", label: "Fire" },
  { key: "hcfmo", label: "HCFMO" },
  { key: "lawEnforcement", label: "Law Enforcement" },
  { key: "hazmat", label: "HAZMAT" },
  { key: "railroad", label: "Railroad" },
  { key: "txdot", label: "TXDOT" },
];
const WILDLAND_MUTUAL_AID_ITEMS = [
  { key: "fire", label: "Fire" },
  { key: "hcfmo", label: "HCFMO" },
  { key: "lawEnforcement", label: "Law Enforcement" },
  { key: "hazmat", label: "HAZMAT" },
  { key: "texasForestryService", label: "Texas Forestry Service" },
];
const RESOURCES_ITEMS = [
  { key: "hold", label: "Hold" },
  { key: "upgrade", label: "Upgrade" },
  { key: "return_", label: "Downgrade" },
];

const TABS = [
  { key: "worksheet", label: "Structure Fire", icon: ClipboardList },
  { key: "mayday", label: "MAYDAY Checklist", icon: AlertTriangle },
  { key: "wildland", label: "Wildland Fire", icon: Layers },
  { key: "lifeflight", label: "Life Flight", icon: MapPin },
  { key: "specialops", label: "Special Operations", icon: ShieldCheck },
  { key: "99bravo", label: "99-Bravo", icon: Users },
  { key: "log", label: "Log", icon: Radio },
];

const SPECIAL_OPS_SUBTABS = ["HAZMAT", "Gas Leak", "Lithium-Ion", "Technical Rescue", "Mass Casualty"];
const TECH_RESCUE_SUBTABS = ["Rope Rescue", "Trench Rescue", "Confined Space", "Structural Collapse", "Water Rescue"];

const HAZMAT_IRR_ACTIONS = [{ key: "referenceErgGuide18", label: "Reference ERG Guide 18" }];
const HAZMAT_IRR_FIELDS = [
  { key: "nameOfMaterial", label: "Name of Material" },
  { key: "idNumber", label: "ID Number" },
  { key: "guideNumber", label: "Guide Number" },
  { key: "isolationDistance", label: "Isolation Distance" },
];
const HAZMAT_MATERIAL_FIELDS = [
  { key: "specificGravity", label: "Specific Gravity" },
  { key: "meltingPoint", label: "Melting Point" },
  { key: "molecularWeight", label: "Molecular Weight" },
];
const HAZMAT_MATERIAL_FIELDS_2 = [
  { key: "materialRoute", label: "Material Route" },
  { key: "materialAction", label: "Material Action" },
  { key: "ppeRequired", label: "Type of PPE Required" },
  { key: "routesOfExposure", label: "Routes of Exposure" },
  { key: "treatmentDecon", label: "Treatment & Decon" },
];
const HAZMAT_AIR_FIELDS = [
  { key: "coLevel", label: "CO Level" },
  { key: "o2Level", label: "O2 Level" },
  { key: "lelLevel", label: "LEL Level" },
  { key: "hcnLevel", label: "HCN Level" },
  { key: "h2sLevel", label: "H2S Level" },
  { key: "otherLevels", label: "Other Levels" },
];
const HAZMAT_SCBA_THRESHOLDS = [
  "CO - >100 till <70",
  "O2 - <19.5% or >23%",
  "LEL - >10%",
  "HCN - 5ppm or >",
  "H2S - 10ppm or >",
];
const HAZMAT_VICTIM_FIELDS = [
  { key: "numberOfPatients", label: "Number of Patients" },
  { key: "signsSymptoms", label: "Signs & Symptoms" },
  { key: "deconLocation", label: "Decon Location" },
];

const PRE_ENTRY_ITEMS = [
  { key: "preEntryBriefing", label: "Pre-Entry Briefing" },
  { key: "fallProtection", label: "Fall Protection" },
  { key: "ppe", label: "PPE" },
  { key: "clearSpoil", label: "Clear Spoil" },
  { key: "edgeProtection", label: "Edge Protection" },
  { key: "ladders", label: "Ladders" },
  { key: "airMonitoring", label: "Air Monitoring" },
  { key: "ventilation", label: "Ventilation" },
  { key: "lighting", label: "Lighting" },
  { key: "perimeter", label: "Perimeter" },
];
const CONFINED_SPACE_PRE_ENTRY_ITEMS = [
  { key: "preEntryBriefing", label: "Pre-Entry Briefing" },
  { key: "fallProtection", label: "Fall Protection" },
  { key: "ppe", label: "PPE" },
  { key: "holeAttendant", label: "Hole Attendant" },
  { key: "ladders", label: "Ladders" },
  { key: "airMonitoring", label: "Air Monitoring" },
  { key: "ventilation", label: "Ventilation" },
  { key: "lighting", label: "Lighting" },
  { key: "perimeter", label: "Perimeter" },
];
const STRUCTURAL_COLLAPSE_PRE_ENTRY_ITEMS = [
  { key: "preEntryBriefing", label: "Pre-Entry Briefing" },
  { key: "fallProtection", label: "Fall Protection" },
  { key: "ppe", label: "PPE" },
  { key: "ladders", label: "Ladders" },
  { key: "airMonitoring", label: "Air Monitoring" },
  { key: "ventilation", label: "Ventilation" },
  { key: "lighting", label: "Lighting" },
  { key: "perimeter", label: "Perimeter" },
];
const RESCUE_RECOVERY_ITEMS = [
  { key: "soilRemoval", label: "Soil Removal" },
  { key: "patientContact", label: "Patient Contact" },
  { key: "patientPackaging", label: "Patient Packaging" },
  { key: "patientExtrication", label: "Patient Extrication" },
  { key: "patientTransferredToEms", label: "Patient Transferred to EMS" },
];
const CONFINED_SPACE_RESCUE_RECOVERY_ITEMS = [
  { key: "patientContact", label: "Patient Contact" },
  { key: "patientPackaging", label: "Patient Packaging" },
  { key: "patientExtrication", label: "Patient Extrication" },
  { key: "patientTransferredToEms", label: "Patient Transferred to EMS" },
];
const ROPE_RESCUE_RECOVERY_ITEMS = [
  { key: "patientContact", label: "Patient Contact" },
  { key: "patientPackaging", label: "Patient Packaging" },
  { key: "patientExtrication", label: "Patient Extrication" },
  { key: "patientTransferredToEms", label: "Patient Transferred to EMS" },
];
const INCIDENT_TERMINATION_ITEMS = [
  { key: "pars", label: "PAR" },
  { key: "equipmentRemoved", label: "Equipment Removed" },
  { key: "sceneSecured", label: "Scene Secured" },
  { key: "contactOsha", label: "Contact OSHA" },
  { key: "afterActionReview", label: "After Action Review" },
];
const WATER_RESCUE_INCIDENT_TERMINATION_ITEMS = [
  { key: "pars", label: "PAR" },
  { key: "equipmentRemoved", label: "Equipment Removed" },
  { key: "sceneSecured", label: "Scene Secured" },
  { key: "afterActionReview", label: "After Action Review" },
];
const WATER_RESCUE_PRE_ENTRY_ITEMS = [
  { key: "preEntryBriefing", label: "Pre-Entry Briefing" },
  { key: "pfdHelmet", label: "PFD & Helmet" },
  { key: "lighting", label: "Lighting" },
];
const WATER_RESCUE_MUTUAL_AID_ITEMS = [
  { key: "fire", label: "Fire" },
  { key: "lawEnforcement", label: "Law Enforcement" },
  { key: "txdot", label: "TXDOT" },
  { key: "usCoastGuard", label: "US Coast Guard" },
  { key: "hcsoDiveTeam", label: "HCSO Dive Team" },
];
const WATER_RESCUE_BENCHMARKS_LOGISTICS_ITEMS = [
  { key: "anchorIdentification", label: "Anchor Identification" },
  { key: "retrievalSystem", label: "Retrieval System" },
  { key: "otherEquipment", label: "Other Applicable Equipment" },
];
const CONFINED_SPACE_LOGISTICS_ITEMS = [
  { key: "rescuerPpe", label: "Rescuer PPE" },
  { key: "anchorIdentification", label: "Anchor Identification" },
  { key: "retrievalSystem", label: "Retrieval System" },
  { key: "otherEquipment", label: "Other Applicable Equipment" },
];
const HAZMAT_BENCHMARKS_LOGISTICS_ITEMS = [
  { key: "rescuerPpe", label: "Rescuer PPE" },
  { key: "otherEquipment", label: "Other Applicable Equipment" },
];

const MAYDAY_WHAT_OPTIONS = ["Lost", "Trapped", "Injured", "Out of Air", "SCBA Malfunction", "Other"];
const MAYDAY_DIVISION_OPTIONS = ["1", "2", "3", "4", "Other"];

const WIND_DIRECTION_OPTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const TAC_CHANNEL_OPTIONS = ["TAC-03", "TAC-04", "TAC-05", "Other"];
const CONFINED_SPACE_ASSIGNMENT_OPTIONS = [
  "Rescue Group",
  "Rescue Unit",
  "Safety",
  "RIT",
  "Medical Group",
  "Medical Unit",
  "Decon Group",
  "Rehab Group",
];
const STRUCTURAL_COLLAPSE_ASSIGNMENT_OPTIONS = [
  "Shoring Unit",
  "Rescue Group",
  "Rescue Unit",
  "Safety",
  "RIT",
  "Medical Group",
  "Medical Unit",
  "Decon Group",
  "Rehab Group",
];
const HAZMAT_ASSIGNMENT_OPTIONS = [
  "Investigating",
  "Rescue Group",
  "Rescue Unit",
  "Safety",
  "RIT",
  "Medical Group",
  "Medical Unit",
  "Decon Group",
  "Rehab Group",
];
const ROPE_RESCUE_ASSIGNMENT_OPTIONS = [
  "Rescue Group",
  "Rescue Unit",
  "Roof Sector",
  "Turntable",
  "Landing Zone",
  "Safety",
  "RIT",
  "Medical Group",
  "Medical Unit",
  "Decon Group",
  "Rehab Group",
];
const GROUND_CONTACT_CHANNEL_OPTIONS = ["HCMA-02", "Other"];
const LIFE_FLIGHT_UNIT_OPTIONS = ["LF-1", "LF-2", "LF-3", "LF-4", "LF-5", "LF-6", "Other"];

const LZ_HAZARDS_ITEMS = [
  { key: "wires", label: "Overhead Wires" },
  { key: "polesTowers", label: "Poles / Towers" },
  { key: "trees", label: "Trees" },
  { key: "debrisDust", label: "Loose Debris / Dust" },
  { key: "vehicles", label: "Vehicles" },
  { key: "personnel", label: "Personnel / Bystanders Clear (100 ft)" },
  { key: "livestockFencing", label: "Livestock / Fencing" },
];

const LZ_SURFACE_ITEMS = [
  { key: "firmLevel", label: "Firm & Level Surface" },
  { key: "freeOfDebris", label: "Free of Loose Debris" },
];

const LZ_LIGHTING_ITEMS = [
  { key: "cornersMarked", label: "Corners Marked (Cones/Flares/Personnel)" },
  { key: "windIndicator", label: "Windsock / Wind Indicator Visible" },
];

const SUPPRESSION_ASSIGNMENT_OPTIONS = ["Ground Contact", "Rescue Group", "Medical Group", "Landing Zone", "Safety"];
const EMS_ASSIGNMENT_OPTIONS = ["Medical Group"];

const PATIENT_INTERVENTION_ITEMS = [
  { key: "bloodAdministration", label: "Blood Administration" },
  { key: "cpr", label: "CPR" },
  { key: "emergentAirway", label: "Emergent Airway" },
  { key: "tourniquet", label: "Tourniquet" },
  { key: "other", label: "Other" },
];

const STORAGE_KEY = "active-incident-v2";

function formatElapsed(ms) {
  if (ms == null || ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const STREET_SUFFIXES = [
  "rd", "road", "st", "street", "ave", "avenue", "dr", "drive", "ln", "lane",
  "blvd", "boulevard", "ct", "court", "cir", "circle", "pkwy", "parkway",
  "way", "ter", "terrace", "pl", "place", "trl", "trail", "hwy", "highway",
  "cv", "cove", "xing", "crossing", "loop", "run", "pass", "sq", "square",
];

function deriveCommandName(address) {
  if (!address) return "";
  const streetPart = address.split(",")[0];
  let tokens = streetPart.trim().split(/\s+/).filter(Boolean);
  tokens = tokens.filter((t) => !/^#?\d+[a-zA-Z]?$/.test(t));
  if (tokens.length > 1) {
    const last = tokens[tokens.length - 1].toLowerCase().replace(/\./g, "");
    if (STREET_SUFFIXES.includes(last)) tokens = tokens.slice(0, -1);
  }
  if (tokens.length === 0) return "";
  const name = tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join(" ");
  return `${name} Command`;
}

function emptyBoolMap(items) {
  const m = {};
  items.forEach((i) => (m[i.key] = null));
  return m;
}

const emptyState = () => ({
  address: "",
  incidentType: "",
  startTime: null,

  sizeUp: {
    size: null,
    height: null,
    heightOther: "",
    occupancy: null,
    problem: null,
    smokeLevel: null, // Light / Heavy
    fireMode: null, // Working / Defensive
    floor: "",
    floorOther: "",
    side: null,
    centerUnit: null,
    endUnit: null,
    waterSupplyEstablished: null,
    waterSupplyUnitLocation: "",
    fdc: null,
    fdcSide: null,
  },

  command: {
    strategy: null,
    unit: null,
    name: "",
    location: "",
    locationOther: "",
  },
  followUp: {
    threeSixty: null,
    threeSixtyStatus: null, // Complete / Incomplete
    threeSixtyIncompleteReason: null,
    threeSixtyIncompleteOther: "",
    hazards: "",
    hazardsPresent: null,
    hazardsA: null,
    hazardsB: null,
    hazardsC: null,
    hazardsD: null,
    exposures: null,
    exposureA: null,
    exposureB: null,
    exposureC: null,
    exposureD: null,
    ticReading: "",
    accountability: "",
  },
  resources: emptyBoolMap(RESOURCES_ITEMS),
  alarmLevel: "",
  alarmLevelOther: "",
  level2Staging: "",
  commandTransfer: emptyBoolMap(COMMAND_TRANSFER_ITEMS),
  strategyConfirmationMode: null, // Offensive / Defensive
  box: "",
  alarms: "",

  firstAlarmUnits: [],
  secondAlarmUnits: [],
  thirdAlarmUnits: [],
  fourthAlarmUnits: [],
  firstAlarmEmsUnits: [],
  secondAlarmEmsUnits: [],
  thirdAlarmEmsUnits: [],
  fourthAlarmEmsUnits: [],

  waterSupply: { unit: "", source: "", fdc: "" },
  utilities: emptyBoolMap(UTILITIES_ITEMS),
  mutualAid: { ...emptyBoolMap(MUTUAL_AID_ITEMS), fireDept: "" },
  safety: emptyBoolMap(SAFETY_ITEMS),
  rit: emptyBoolMap(RIT_ITEMS),
  medicalRehab: { ...emptyBoolMap(MEDICAL_REHAB_ITEMS), medicalUnit: "", medicalSide: null, rehabSide: null },

  taskBoxSegments: { primarySearch: null, ventilation: null, secondarySearch: null },
  taskBoxFireControl: { side: null, door: null },
  roof: { type: null, condition: null, atticConditions: null, atticInvolvement: null, checks: emptyBoolMap(ROOF_CHECKLIST) },

  mayday: {
    sems: null,
    unitInAlarm: null,
    unitInAlarmId: "",
    airSupplyStep1: null,
    airSupplyStep1Value: "",
    mobileRadio: null,
    mobileRadioId: "",
    step2: null,
    step3: null,
    whoName: "",
    whoUnit: "",
    whoUnitManual: false,
    what: null,
    whatOther: "",
    whereSide: null,
    whereDivision: null,
    whereDivisionOther: "",
    airSupply: "",
    airSupplyManual: false,
    step4: null,
    step5: null,
    rescueGroup: [],
    rescueGroupOther: "",
    step6: null,
    step7: null,
    step8: null,
    step9AdditionalRit: null,
    step9AdditionalDivisionOfficer: null,
    step9Level2Staging: null,
    level2StagingLocation: "",
    managerType: null,
    managerDivision: null,
    managerOther: "",
    step10: null,
    step10Transmit: null,
  },

  lifeFlight: {
    tacChannel: null,
    tacChannelOther: "",
    groundContactChannel: null,
    groundContactChannelOther: "",
    lifeFlightUnit: null,
    lifeFlightUnitOther: "",
    safelyOnGround: null,
    safelyOffGround: null,
    suppressionUnits: [],
    emsUnits: [],
    problem: null,
    problemOther: "",
    mvaEntrapment: null,
    mvaEjection: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    landingZoneLocation: "",
    surface: emptyBoolMap(LZ_SURFACE_ITEMS),
    hazards: emptyBoolMap(LZ_HAZARDS_ITEMS),
    lighting: emptyBoolMap(LZ_LIGHTING_ITEMS),
    windDirection: null,
    windSpeed: "",
    patients: [],
    mutualAid: {
      fire: null,
      fireDept: "",
      hcfmo: null,
      lawEnforcement: null,
      hazmat: null,
      railroad: null,
      txdot: null,
    },
  },

  hazmat: {
    incidentType: null,
    assumeCommand: null,
    referenceErgGuide18: null,
    nameOfMaterial: null,
    nameOfMaterialValue: "",
    idNumber: null,
    idNumberValue: "",
    guideNumber: null,
    guideNumberValue: "",
    isolationDistance: null,
    isolationDistanceValue: "",
    specificGravity: null,
    specificGravityValue: "",
    meltingPoint: null,
    meltingPointValue: "",
    molecularWeight: null,
    molecularWeightValue: "",
    acidOrBase: null,
    materialRoute: null,
    materialRouteValue: "",
    materialAction: null,
    materialActionValue: "",
    ppeRequired: null,
    ppeRequiredValue: "",
    routesOfExposure: null,
    routesOfExposureValue: "",
    treatmentDecon: null,
    treatmentDeconValue: "",
    coLevel: null,
    coLevelValue: "",
    o2Level: null,
    o2LevelValue: "",
    lelLevel: null,
    lelLevelValue: "",
    hcnLevel: null,
    hcnLevelValue: "",
    h2sLevel: null,
    h2sLevelValue: "",
    otherLevels: null,
    otherLevelsValue: "",
    numberOfPatients: null,
    numberOfPatientsOther: "",
    rescueOrRecovery: null,
    age: "",
    sex: null,
    weightKg: "",
    weightLbs: "",
    problemDescription: "",
    suppressionUnits: [],
    emsUnits: [],
    benchmarks: {
      establishZones: null,
      evacuationSipProtocol: null,
      identifyHazards: null,
      rescueRecovery: null,
      pars: null,
      contactOsha: null,
      afterActionReview: null,
      termination: null,
    },
    logistics: {
      rescuerPpe: null,
      anchorIdentification: null,
      retrievalSystem: null,
      otherEquipment: null,
    },
    lifeFlightResponse: null,
    mutualAid: {
      fire: null,
      fireDept: "",
      hazmat: null,
      hazmatDept: "",
      hcfmo: null,
      lawEnforcement: null,
      epaPollutionControl: null,
      railroad: null,
      txdot: null,
    },
  },

  confinedSpace: {
    incidentType: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    lifeFlightResponse: null,
    followUp: {
      incidentType: null,
      incidentTypeOther: "",
      trenchHazards: [],
      trenchHazardsOther: "",
    },
    patients: [],
    airMonitoring: {
      coLevel: null,
      coLevelValue: "",
      o2Level: null,
      o2LevelValue: "",
      lelLevel: null,
      lelLevelValue: "",
      hcnLevel: null,
      hcnLevelValue: "",
      h2sLevel: null,
      h2sLevelValue: "",
      otherLevels: null,
      otherLevelsValue: "",
    },
    suppressionUnits: [],
    emsUnits: [],
    preEntry: {
      preEntryBriefing: null,
      fallProtection: null,
      ppe: null,
      clearSpoil: null,
      edgeProtection: null,
      ladders: null,
      airMonitoring: null,
      ventilation: null,
      lighting: null,
      perimeter: null,
    },
    rescueRecovery: {
      soilRemoval: null,
      patientContact: null,
      patientPackaging: null,
      patientExtrication: null,
      patientTransferredToEms: null,
    },
    incidentTermination: {
      pars: null,
      equipmentRemoved: null,
      sceneSecured: null,
      contactOsha: null,
      afterActionReview: null,
    },
    logistics: {
      rescuerPpe: null,
      anchorIdentification: null,
      retrievalSystem: null,
      otherEquipment: null,
    },
    benchmarks: {
      airMonitoring: null,
      contactOsha: null,
      rescueRecovery: null,
      establishZones: null,
      identifyHazards: null,
      pars: null,
      afterActionReview: null,
      termination: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      hazmat: null,
      hazmatDept: "",
      hcfmo: null,
      lawEnforcement: null,
      epaPollutionControl: null,
      railroad: null,
      txdot: null,
      osha: null,
    },
  },

  ropeRescue: {
    incidentType: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    lifeFlightResponse: null,
    followUp: {
      incidentType: null,
    },
    patients: [],
    airMonitoring: {
      coLevel: null,
      coLevelValue: "",
      o2Level: null,
      o2LevelValue: "",
      lelLevel: null,
      lelLevelValue: "",
      hcnLevel: null,
      hcnLevelValue: "",
      h2sLevel: null,
      h2sLevelValue: "",
      otherLevels: null,
      otherLevelsValue: "",
    },
    suppressionUnits: [],
    emsUnits: [],
    rescueRecoveryBox: {
      patientContact: null,
      patientPackaging: null,
      patientExtrication: null,
      patientTransferredToEms: null,
    },
    incidentTermination: {
      pars: null,
      equipmentRemoved: null,
      sceneSecured: null,
      contactOsha: null,
      afterActionReview: null,
    },
    logistics: {
      rescuerPpe: null,
      anchorIdentification: null,
      retrievalSystem: null,
      otherEquipment: null,
    },
    benchmarks: {
      airMonitoring: null,
      contactOsha: null,
      rescueRecovery: null,
      establishZones: null,
      identifyHazards: null,
      pars: null,
      afterActionReview: null,
      termination: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      hazmat: null,
      hazmatDept: "",
      hcfmo: null,
      lawEnforcement: null,
      epaPollutionControl: null,
      railroad: null,
      txdot: null,
    },
  },

  trenchRescue: {
    incidentType: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    lifeFlightResponse: null,
    followUp: {
      incidentType: null,
      incidentTypeOther: "",
      trenchHazards: [],
      trenchHazardsOther: "",
    },
    patients: [],
    airMonitoring: {
      coLevel: null,
      coLevelValue: "",
      o2Level: null,
      o2LevelValue: "",
      lelLevel: null,
      lelLevelValue: "",
      hcnLevel: null,
      hcnLevelValue: "",
      h2sLevel: null,
      h2sLevelValue: "",
      otherLevels: null,
      otherLevelsValue: "",
    },
    suppressionUnits: [],
    emsUnits: [],
    preEntry: {
      preEntryBriefing: null,
      fallProtection: null,
      ppe: null,
      clearSpoil: null,
      edgeProtection: null,
      ladders: null,
      airMonitoring: null,
      ventilation: null,
      lighting: null,
      perimeter: null,
    },
    rescueRecovery: {
      soilRemoval: null,
      patientContact: null,
      patientPackaging: null,
      patientExtrication: null,
      patientTransferredToEms: null,
    },
    incidentTermination: {
      pars: null,
      equipmentRemoved: null,
      sceneSecured: null,
      contactOsha: null,
      afterActionReview: null,
    },
    logistics: {
      rescuerPpe: null,
      anchorIdentification: null,
      retrievalSystem: null,
      otherEquipment: null,
    },
    benchmarks: {
      airMonitoring: null,
      contactOsha: null,
      rescueRecovery: null,
      establishZones: null,
      identifyHazards: null,
      pars: null,
      afterActionReview: null,
      termination: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      hazmat: null,
      hazmatDept: "",
      hcfmo: null,
      lawEnforcement: null,
      epaPollutionControl: null,
      railroad: null,
      txdot: null,
      osha: null,
    },
  },

  structuralCollapse: {
    incidentType: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    lifeFlightResponse: null,
    followUp: {
      incidentType: null,
      incidentTypeOther: "",
      trenchHazards: [],
      trenchHazardsOther: "",
    },
    patients: [],
    airMonitoring: {
      coLevel: null,
      coLevelValue: "",
      o2Level: null,
      o2LevelValue: "",
      lelLevel: null,
      lelLevelValue: "",
      hcnLevel: null,
      hcnLevelValue: "",
      h2sLevel: null,
      h2sLevelValue: "",
      otherLevels: null,
      otherLevelsValue: "",
    },
    suppressionUnits: [],
    emsUnits: [],
    preEntry: {
      preEntryBriefing: null,
      fallProtection: null,
      ppe: null,
      clearSpoil: null,
      edgeProtection: null,
      ladders: null,
      airMonitoring: null,
      ventilation: null,
      lighting: null,
      perimeter: null,
    },
    rescueRecovery: {
      soilRemoval: null,
      patientContact: null,
      patientPackaging: null,
      patientExtrication: null,
      patientTransferredToEms: null,
    },
    incidentTermination: {
      pars: null,
      equipmentRemoved: null,
      sceneSecured: null,
      contactOsha: null,
      afterActionReview: null,
    },
    logistics: {
      rescuerPpe: null,
      anchorIdentification: null,
      retrievalSystem: null,
      otherEquipment: null,
    },
    benchmarks: {
      airMonitoring: null,
      contactOsha: null,
      rescueRecovery: null,
      establishZones: null,
      identifyHazards: null,
      identifySecondaryCollapse: null,
      pars: null,
      afterActionReview: null,
      termination: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      hazmat: null,
      hazmatDept: "",
      hcfmo: null,
      lawEnforcement: null,
      texasTaskForce: null,
      k9: null,
      osha: null,
    },
  },

  waterRescue: {
    incidentType: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    lifeFlightResponse: null,
    followUp: {
      incidentType: null,
      incidentTypeOther: "",
      trenchHazards: [],
      trenchHazardsOther: "",
    },
    patients: [],
    airMonitoring: {
      coLevel: null,
      coLevelValue: "",
      o2Level: null,
      o2LevelValue: "",
      lelLevel: null,
      lelLevelValue: "",
      hcnLevel: null,
      hcnLevelValue: "",
      h2sLevel: null,
      h2sLevelValue: "",
      otherLevels: null,
      otherLevelsValue: "",
    },
    suppressionUnits: [],
    emsUnits: [],
    preEntry: {
      preEntryBriefing: null,
      pfdHelmet: null,
      lighting: null,
    },
    rescueRecovery: {
      soilRemoval: null,
      patientContact: null,
      patientPackaging: null,
      patientExtrication: null,
      patientTransferredToEms: null,
    },
    incidentTermination: {
      pars: null,
      equipmentRemoved: null,
      sceneSecured: null,
      contactOsha: null,
      afterActionReview: null,
    },
    logistics: {
      rescuerPpe: null,
      anchorIdentification: null,
      retrievalSystem: null,
      otherEquipment: null,
    },
    benchmarks: {
      airMonitoring: null,
      contactOsha: null,
      rescueRecovery: null,
      establishZones: null,
      identifyHazards: null,
      pfdHelmet: null,
      pars: null,
      afterActionReview: null,
      termination: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      lawEnforcement: null,
      txdot: null,
      usCoastGuard: null,
      hcsoDiveTeam: null,
    },
  },

  wildland: {
    problem: null,
    windDirection: null,
    windSpeed: "",
    relativeHumidity: "",
    waterSupply: null,
    waterSupplyOther: "",
    fillSiteLocation: "",
    medicalRehab: { ...emptyBoolMap(MEDICAL_REHAB_ITEMS), medicalUnit: "", medicalSide: null, rehabSide: null },
    safety: emptyBoolMap(LCES_ITEMS),
    threeSixty: null,
    threeSixtyStatus: null,
    threeSixtyIncompleteReason: null,
    threeSixtyIncompleteOther: "",
    size: null,
    hazards: null,
    hazardsA: null,
    hazardsB: null,
    hazardsC: null,
    hazardsD: null,
    hazardsNote: "",
    exposures: null,
    exposureA: null,
    exposureB: null,
    exposureC: null,
    exposureD: null,
    exposuresNote: "",
    patients: [],
    suppressionUnits: [],
    emsUnits: [],
    mutualAid: {
      fire: null,
      fireDept: "",
      hcfmo: null,
      lawEnforcement: null,
      hazmat: null,
      texasForestryService: null,
    },
    },

  ninetyNineBravo: {
    commandTransferPar: null,
    checklist: {
      reviewMdcNotes: null,
      requestTacChannel: null,
      par: null,
      lawEnforcementStatus: null,
      transmit: null,
      termination: null,
    },
    lawEnforcementStatusMode: null,
    suppressionUnits: [],
    emsUnits: [],
  },

  lithiumIon: {
    commandTransferPar: null,
    followUp: {
      incidentType: null,
      threeSixty: null,
      threeSixtyStatus: null,
      threeSixtyIncompleteReason: null,
      threeSixtyIncompleteOther: "",
      numberOfPatients: null,
      numberOfPatientsOther: "",
    },
    benchmarks: {
      establishZones: null,
      identifyHazards: null,
      relocateVehicle: null,
      deployBlanket: null,
      contactHazmat: null,
      pars: null,
      termination: null,
    },
    logistics: {
      rescuerPpe: null,
    },
    coLevel: null,
    coLevelValue: "",
    o2Level: null,
    o2LevelValue: "",
    lelLevel: null,
    lelLevelValue: "",
    hcnLevel: null,
    hcnLevelValue: "",
    h2sLevel: null,
    h2sLevelValue: "",
    otherLevels: null,
    otherLevelsValue: "",
    utilities: {
      electric: null,
      gas: null,
      water: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      hcfmo: null,
      lawEnforcement: null,
      hazmat: null,
      hazmatDept: "",
      epaPollutionControl: null,
      railroad: null,
      txdot: null,
    },
    suppressionUnits: [],
    emsUnits: [],
  },

  gasLeak: {
    commandTransferPar: null,
    followUp: {
      incidentType: null,
      threeSixty: null,
      threeSixtyStatus: null,
      threeSixtyIncompleteReason: null,
      threeSixtyIncompleteOther: "",
      numberOfPatients: null,
      numberOfPatientsOther: "",
    },
    benchmarks: {
      contactOsha: null,
      establishZones: null,
      evacuationSipProtocol: null,
      identifyHazards: null,
      rescueRecovery: null,
      pars: null,
      afterActionReview: null,
      termination: null,
    },
    logistics: {
      rescuerPpe: null,
      otherEquipment: null,
    },
    coLevel: null,
    coLevelValue: "",
    o2Level: null,
    o2LevelValue: "",
    lelLevel: null,
    lelLevelValue: "",
    hcnLevel: null,
    hcnLevelValue: "",
    h2sLevel: null,
    h2sLevelValue: "",
    otherLevels: null,
    otherLevelsValue: "",
    utilities: {
      electric: null,
      gas: null,
      water: null,
    },
    mutualAid: {
      fire: null,
      fireDept: "",
      hcfmo: null,
      lawEnforcement: null,
      hazmat: null,
      hazmatDept: "",
      epaPollutionControl: null,
      railroad: null,
      txdot: null,
    },
    suppressionUnits: [],
    emsUnits: [],
  },

  parLog: [],
  log: [],
});

// ---------- Small reusable UI pieces ----------
function BadgeIcon({ size = 28 }) {
  const h = size * 1.07;
  return (
    <img
      src={CYFAIR_LOGO}
      alt="Cy-Fair Fire Department"
      width={size}
      height={h}
      className="shrink-0 rounded"
      style={{ objectFit: "cover", border: `1px solid ${theme.gold}` }}
    />
  );
}

function CollapsibleSection({ title, children, borderAccent, defaultOpen = false, forceOpen = false, fill = false }) {
  const [open, setOpen] = useState(defaultOpen || forceOpen);
  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);
  return (
    <div
      className={`rounded-lg p-4${fill ? " h-full flex flex-col" : ""}`}
      style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderLeft: borderAccent ? `3px solid ${borderAccent}` : undefined }}
    >
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-left">
        <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>
          {title}
        </h3>
        <span className="text-sm font-bold" style={{ color: theme.textDim }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function GroupHeader({ children }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-sm font-bold uppercase tracking-widest shrink-0" style={{ color: theme.textPrimary, letterSpacing: "0.08em" }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: theme.border }} />
    </div>
  );
}

function Section({ title, children, accent, glow, fill, borderAccent }) {
  return (
    <div
      className={`rounded-lg p-4${fill ? " h-full flex flex-col" : ""}`}
      style={{
        background: glow ? theme.blueDim : theme.panel,
        border: `1px solid ${glow ? theme.blue : theme.border}`,
        borderLeft: borderAccent ? `3px solid ${borderAccent}` : undefined,
      }}
    >
      <h3
        className="text-xs font-bold uppercase tracking-wide mb-3"
        style={{ color: glow ? theme.blue : accent || theme.textSecondary }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Pill({ active, onClick, children, color, compact, micro }) {
  const cls = micro
    ? "rounded text-[9px] font-bold px-1 py-1 leading-none whitespace-nowrap"
    : compact
    ? "rounded text-xs font-semibold mr-1.5 mb-1.5 px-2 py-1"
    : "px-3 py-2 rounded text-sm font-semibold mr-2 mb-2";
  return (
    <button
      onClick={onClick}
      className={cls}
      style={{
        background: active ? color || theme.gold : theme.panelAlt,
        border: `1px solid ${active ? color || theme.gold : theme.border}`,
        color: active ? (color ? "#fff" : theme.bg) : theme.textSecondary,
      }}
    >
      {children}
    </button>
  );
}

function CheckRow({ label, value, onToggle, disabled, hint, bold }) {
  const checked = value != null;
  return (
    <button
      onClick={disabled ? undefined : onToggle}
      disabled={disabled}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm mb-1.5 text-left ${bold ? "font-bold" : "font-semibold"}`}
      style={{
        background: checked ? theme.greenDim : theme.panelAlt,
        border: `1px solid ${checked ? theme.green : theme.border}`,
        color: checked ? theme.green : disabled ? theme.textDim : theme.textPrimary,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span className="flex items-center gap-2">
        <span
          className="flex items-center justify-center rounded shrink-0"
          style={{
            width: 18,
            height: 18,
            border: `1.5px solid ${checked ? theme.green : theme.textDim}`,
            background: checked ? theme.green : "transparent",
          }}
        >
          {checked && <Check size={13} color="#fff" />}
        </span>
        <span className="min-w-0">
          {label}
          {disabled && hint && (
            <span className="block text-xs font-normal mt-0.5" style={{ color: theme.textDim }}>
              {hint}
            </span>
          )}
        </span>
      </span>
      {checked && (
        <span className="text-xs tabular-nums" style={{ fontFamily: mono }}>
          {formatElapsed(value)}
        </span>
      )}
    </button>
  );
}

function SegmentedCheckRow({ label, value, options, onSelect }) {
  const active = value != null;
  return (
    <div
      className="w-full px-3 py-2.5 rounded mb-1.5"
      style={{
        background: active ? theme.greenDim : theme.panelAlt,
        border: `1px solid ${active ? theme.green : theme.border}`,
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold" style={{ color: active ? theme.green : theme.textPrimary }}>
          {label}
          {active && <span className="ml-1 font-normal">— {value.mode}</span>}
        </span>
        {active && (
          <span className="text-xs tabular-nums" style={{ fontFamily: mono, color: active ? theme.green : theme.textPrimary }}>
            {formatElapsed(value.time)}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {options.map((o) => {
          const selected = value != null && value.mode === o;
          return (
            <button
              key={o}
              onClick={() => onSelect(o)}
              className="flex-1 py-1.5 rounded text-xs font-bold"
              style={{
                background: selected ? theme.green : theme.bg,
                border: `1px solid ${selected ? theme.green : theme.border}`,
                color: selected ? "#fff" : theme.textSecondary,
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded text-sm outline-none"
        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
      />
    </div>
  );
}

function AutoCheckRow({ label, unit }) {
  const active = !!unit;
  return (
    <div
      className="w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-semibold mb-1.5"
      style={{
        background: active ? theme.greenDim : theme.panelAlt,
        border: `1px solid ${active ? theme.green : theme.border}`,
        color: active ? theme.green : theme.textPrimary,
      }}
    >
      <span className="flex items-center gap-2">
        <span
          className="flex items-center justify-center rounded shrink-0"
          style={{
            width: 18,
            height: 18,
            border: `1.5px solid ${active ? theme.green : theme.textDim}`,
            background: active ? theme.green : "transparent",
          }}
        >
          {active && <Check size={13} color="#fff" />}
        </span>
        {label}
      </span>
      {active && (
        <span className="text-xs tabular-nums" style={{ fontFamily: mono }}>
          {unit.unit}
        </span>
      )}
    </div>
  );
}

function CheckTextRow({ label, checked, onToggle, value, onChange, placeholder }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-1.5">
      <CheckRow label={label} value={checked} onToggle={onToggle} />
      <TextField value={value} onChange={onChange} placeholder={placeholder || label} />
    </div>
  );
}

function ChecklistSection({ title, items, data, onToggle, accent, glow, borderAccent }) {
  return (
    <Section title={title} accent={accent} glow={glow} borderAccent={borderAccent}>
      {items.map((it) => (
        <CheckRow key={it.key} label={it.label} value={data[it.key]} onToggle={() => onToggle(it.key, it.label)} />
      ))}
    </Section>
  );
}

// ---------- Main App ----------
function TacticalWorksheet() {
  const [state, setState] = useState(emptyState());
  const [now, setNow] = useState(Date.now());
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("worksheet");
  const [specialOpsSubTab, setSpecialOpsSubTab] = useState("HAZMAT");
  const [techRescueSubTab, setTechRescueSubTab] = useState("Rope Rescue");
  const [hazardsOpenMap, setHazardsOpenMap] = useState({});
  const [parReminder, setParReminder] = useState(true);
  const [noteText, setNoteText] = useState("");
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, false);
        if (result && result.value) setState(JSON.parse(result.value));
      } catch (e) {
        // nothing saved yet
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
      } catch (e) {
        console.error("Autosave failed", e);
      }
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [state, loaded]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsedSince = useCallback(() => (state.startTime ? Math.max(0, now - state.startTime) : 0), [
    state.startTime,
    now,
  ]);

  const addLog = (draft, text) => {
    draft.log = [{ id: uid(), time: elapsedSince(), text }, ...draft.log];
  };

  function startIncident() {
    setState((s) => {
      const draft = { ...s, startTime: Date.now() };
      draft.log = [{ id: uid(), time: 0, text: "Incident started" }];
      return draft;
    });
    const routeMap = {
      "Structure Fire": "worksheet",
      "Wildland Fire": "wildland",
      "Life Flight": "lifeflight",
      "Special Operations": "specialops",
      "99-Bravo": "99bravo",
    };
    setTab(routeMap[state.incidentType] || "worksheet");
  }

  function buildLogText() {
    const header = `Incident Log\nAddress: ${state.address || "—"}\nType: ${state.incidentType || "—"}\n\n`;
    const lines = state.log.map((entry) => `[${formatElapsed(entry.time)}] ${entry.text}`).join("\n");
    return header + lines;
  }

  function saveLogFile() {
    const content = buildLogText();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `incident-log-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function emailLogFile() {
    const subject = encodeURIComponent(`Incident Log — ${state.address || "Incident"}`);
    const body = encodeURIComponent(buildLogText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function endIncident() {
    if (!window.confirm("End this incident? The worksheet will be archived and cleared for the next call.")) return;
    (async () => {
      try {
        await window.storage.set(`incident-history:${Date.now()}`, JSON.stringify(state), false);
      } catch (e) {
        console.error("Archive failed", e);
      }
      try {
        await window.storage.delete(STORAGE_KEY, false);
      } catch (e) {
        // ignore
      }
      setState(emptyState());
      setTab("worksheet");
    })();
  }

  // Generic togglers -------------------------------------------------
  function toggleSimple(section, key, label) {
    setState((s) => {
      const current = s[section][key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, [section]: { ...s[section], [key]: value } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function toggleRoof(key, label) {
    setState((s) => {
      const current = s.roof.checks[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, roof: { ...s.roof, checks: { ...s.roof.checks, [key]: value } } };
      addLog(draft, `Roof — ${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function setRoofField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, roof: { ...s.roof, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setSizeUp(key, value, logText) {
    setState((s) => {
      const draft = { ...s, sizeUp: { ...s.sizeUp, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setCommand(key, value, logText) {
    setState((s) => {
      const draft = { ...s, command: { ...s.command, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setFollowUp(key, value, logText) {
    setState((s) => {
      const draft = { ...s, followUp: { ...s.followUp, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setMedicalRehabField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, medicalRehab: { ...s.medicalRehab, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setWildlandMedicalRehabField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, wildland: { ...s.wildland, medicalRehab: { ...s.wildland.medicalRehab, [key]: value } } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function toggleWildlandMedicalRehab(key, label) {
    setState((s) => {
      const current = s.wildland.medicalRehab[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, wildland: { ...s.wildland, medicalRehab: { ...s.wildland.medicalRehab, [key]: value } } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function toggleWildlandSafety(key, label) {
    setState((s) => {
      const current = s.wildland.safety[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, wildland: { ...s.wildland, safety: { ...s.wildland.safety, [key]: value } } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function toggleCommandParGeneric(space) {
    setState((s) => {
      const value = s[space].commandTransferPar == null ? elapsedSince() : null;
      const draft = { ...s, [space]: { ...s[space], commandTransferPar: value } };
      addLog(draft, `PAR ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  const toggleNinetyNineBravoCommandPar = () => toggleCommandParGeneric("ninetyNineBravo");
  const toggleGasLeakCommandPar = () => toggleCommandParGeneric("gasLeak");
  const toggleLithiumIonCommandPar = () => toggleCommandParGeneric("lithiumIon");

  function toggleChecklistGeneric(space, key, label) {
    setState((s) => {
      const current = s[space].checklist[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, [space]: { ...s[space], checklist: { ...s[space].checklist, [key]: value } } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  const toggleNinetyNineBravoChecklist = (key, label) => toggleChecklistGeneric("ninetyNineBravo", key, label);
  const toggleGasLeakChecklist = (key, label) => toggleChecklistGeneric("gasLeak", key, label);
  const toggleLithiumIonChecklist = (key, label) => toggleChecklistGeneric("lithiumIon", key, label);

  function setFieldGeneric(space, key, value, logText) {
    setState((s) => {
      const draft = { ...s, [space]: { ...s[space], [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  const setNinetyNineBravoField = (key, value, logText) => setFieldGeneric("ninetyNineBravo", key, value, logText);
  const setGasLeakField = (key, value, logText) => setFieldGeneric("gasLeak", key, value, logText);
  const setLithiumIonField = (key, value, logText) => setFieldGeneric("lithiumIon", key, value, logText);

  function setGasLeakChecklistField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, gasLeak: { ...s.gasLeak, checklist: { ...s.gasLeak.checklist, [key]: value } } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setWildlandMutualAidField(key, value) {
    setState((s) => ({ ...s, wildland: { ...s.wildland, mutualAid: { ...s.wildland.mutualAid, [key]: value } } }));
  }

  function toggleWildlandMutualAid(key, label) {
    setState((s) => {
      const current = s.wildland.mutualAid[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, wildland: { ...s.wildland, mutualAid: { ...s.wildland.mutualAid, [key]: value } } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function toggleRescueGroupUnit(unit) {
    setState((s) => {
      const current = s.mayday.rescueGroup || [];
      const next = current.includes(unit) ? current.filter((u) => u !== unit) : [...current, unit];
      const draft = { ...s, mayday: { ...s.mayday, rescueGroup: next } };
      addLog(draft, `Rescue Group: ${next.length ? next.join(", ") : "none"}`);
      return draft;
    });
  }

  function setHazmatField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, hazmat: { ...s.hazmat, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function handleHazmatWeightChange(unit, value) {
    setState((s) => {
      const num = parseFloat(value);
      let weightKg = s.hazmat.weightKg;
      let weightLbs = s.hazmat.weightLbs;
      if (unit === "kg") {
        weightKg = value;
        weightLbs = value === "" || isNaN(num) ? "" : (num * 2.20462).toFixed(1);
      } else {
        weightLbs = value;
        weightKg = value === "" || isNaN(num) ? "" : (num / 2.20462).toFixed(1);
      }
      return { ...s, hazmat: { ...s.hazmat, weightKg, weightLbs } };
    });
  }

  function toggleHazmatMutualAid(key, label) {
    setState((s) => {
      const current = s.hazmat.mutualAid[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, hazmat: { ...s.hazmat, mutualAid: { ...s.hazmat.mutualAid, [key]: value } } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function setHazmatMutualAidField(key, value) {
    setState((s) => ({ ...s, hazmat: { ...s.hazmat, mutualAid: { ...s.hazmat.mutualAid, [key]: value } } }));
  }

  function toggleTechRescueMutualAid(space, key, label) {
    setState((s) => {
      const current = s[space].mutualAid[key];
      const value = current == null ? elapsedSince() : null;
      const draft = { ...s, [space]: { ...s[space], mutualAid: { ...s[space].mutualAid, [key]: value } } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  const toggleConfinedSpaceMutualAid = (key, label) => toggleTechRescueMutualAid("confinedSpace", key, label);

  function setTechRescueMutualAidField(space, key, value) {
    setState((s) => ({ ...s, [space]: { ...s[space], mutualAid: { ...s[space].mutualAid, [key]: value } } }));
  }
  const setConfinedSpaceMutualAidField = (key, value) => setTechRescueMutualAidField("confinedSpace", key, value);

  function setTechRescueField(space, key, value, logText) {
    setState((s) => {
      const draft = { ...s, [space]: { ...s[space], [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  const setConfinedSpaceField = (key, value, logText) => setTechRescueField("confinedSpace", key, value, logText);

  function toggleTechRescueNested(space, subsection, key, label) {
    setState((s) => {
      const current = s[space][subsection][key];
      const value = current == null ? elapsedSince() : null;
      const draft = {
        ...s,
        [space]: { ...s[space], [subsection]: { ...s[space][subsection], [key]: value } },
      };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  const toggleConfinedSpaceNested = (subsection, key, label) => toggleTechRescueNested("confinedSpace", subsection, key, label);

  function setTechRescueNestedField(space, subsection, key, value, logText) {
    setState((s) => {
      const draft = {
        ...s,
        [space]: { ...s[space], [subsection]: { ...s[space][subsection], [key]: value } },
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  const setConfinedSpaceNestedField = (subsection, key, value) => setTechRescueNestedField("confinedSpace", subsection, key, value);

  function handleTechRescueWeightChange(space, unit, value) {
    setState((s) => {
      const num = parseFloat(value);
      let weightKg = s[space].victimProfile.weightKg;
      let weightLbs = s[space].victimProfile.weightLbs;
      if (unit === "kg") {
        weightKg = value;
        weightLbs = value === "" || isNaN(num) ? "" : (num * 2.20462).toFixed(1);
      } else {
        weightLbs = value;
        weightKg = value === "" || isNaN(num) ? "" : (num / 2.20462).toFixed(1);
      }
      return {
        ...s,
        [space]: { ...s[space], victimProfile: { ...s[space].victimProfile, weightKg, weightLbs } },
      };
    });
  }
  const handleConfinedSpaceWeightChange = (unit, value) => handleTechRescueWeightChange("confinedSpace", unit, value);

  function addTechRescueUnit(space, listKey) {
    setState((s) => ({
      ...s,
      [space]: {
        ...s[space],
        [listKey]: [...s[space][listKey], { id: uid(), unit: "", staged: null, onDeck: null, onDeckSide: null, assign: "" }],
      },
    }));
  }
  const addConfinedSpaceUnit = (listKey) => addTechRescueUnit("confinedSpace", listKey);

  function updateTechRescueUnit(space, listKey, id, field, value) {
    setState((s) => {
      const list = s[space][listKey].map((u) => (u.id === id ? { ...u, [field]: value } : u));
      return { ...s, [space]: { ...s[space], [listKey]: list } };
    });
  }
  const updateConfinedSpaceUnit = (listKey, id, field, value) => updateTechRescueUnit("confinedSpace", listKey, id, field, value);

  function toggleTechRescueStaged(space, listKey, id) {
    setState((s) => {
      const list = s[space][listKey].map((u) => (u.id === id ? { ...u, staged: u.staged == null ? elapsedSince() : null } : u));
      const draft = { ...s, [space]: { ...s[space], [listKey]: list } };
      const u = list.find((x) => x.id === id);
      addLog(draft, `${u.unit || "Unit"} ${u.staged == null ? "un-staged" : "staged"}`);
      return draft;
    });
  }
  const toggleConfinedSpaceStaged = (listKey, id) => toggleTechRescueStaged("confinedSpace", listKey, id);

  function toggleTechRescueOnDeck(space, listKey, id) {
    setState((s) => {
      const list = s[space][listKey].map((u) => (u.id === id ? { ...u, onDeck: u.onDeck == null ? elapsedSince() : null } : u));
      const draft = { ...s, [space]: { ...s[space], [listKey]: list } };
      const u = list.find((x) => x.id === id);
      addLog(draft, `${u.unit || "Unit"} ${u.onDeck == null ? "off On-Deck" : "On-Deck"}`);
      return draft;
    });
  }
  const toggleConfinedSpaceOnDeck = (listKey, id) => toggleTechRescueOnDeck("confinedSpace", listKey, id);

  function setTechRescueOnDeckSide(space, listKey, id, side) {
    setState((s) => {
      const list = s[space][listKey].map((u) => (u.id === id ? { ...u, onDeckSide: side } : u));
      const draft = { ...s, [space]: { ...s[space], [listKey]: list } };
      const u = list.find((x) => x.id === id);
      addLog(draft, `${u.unit || "Unit"} On-Deck Side: ${side}`);
      return draft;
    });
  }
  const setConfinedSpaceOnDeckSide = (listKey, id, side) => setTechRescueOnDeckSide("confinedSpace", listKey, id, side);

  function removeTechRescueUnit(space, listKey, id) {
    setState((s) => ({
      ...s,
      [space]: { ...s[space], [listKey]: s[space][listKey].filter((u) => u.id !== id) },
    }));
  }
  const removeConfinedSpaceUnit = (listKey, id) => removeTechRescueUnit("confinedSpace", listKey, id);

  function setMaydayLevel2Staging(value) {
    setState((s) => ({
      ...s,
      mayday: { ...s.mayday, level2StagingLocation: value },
      level2Staging: value,
    }));
  }

  function setMaydayField(key, value, logText) {
    setState((s) => {
      const mayday = { ...s.mayday, [key]: value };
      if (key === "unitInAlarmId" && !s.mayday.whoUnitManual) mayday.whoUnit = value;
      if (key === "airSupplyStep1Value" && !s.mayday.airSupplyManual) mayday.airSupply = value;
      if (key === "whoUnit") mayday.whoUnitManual = true;
      if (key === "airSupply") mayday.airSupplyManual = true;
      const draft = { ...s, mayday };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setLifeFlightField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, lifeFlight: { ...s.lifeFlight, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function setWildlandField(key, value, logText) {
    setState((s) => {
      const draft = { ...s, wildland: { ...s.wildland, [key]: value } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }

  function toggleWildlandField(key, label) {
    setState((s) => {
      const value = s.wildland[key] == null ? elapsedSince() : null;
      const draft = { ...s, wildland: { ...s.wildland, [key]: value } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function toggleLifeFlightNested(subsection, key, label) {
    setState((s) => {
      const current = s.lifeFlight[subsection][key];
      const value = current == null ? elapsedSince() : null;
      const draft = {
        ...s,
        lifeFlight: { ...s.lifeFlight, [subsection]: { ...s.lifeFlight[subsection], [key]: value } },
      };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function setLifeFlightMutualAidField(key, value) {
    setState((s) => ({ ...s, lifeFlight: { ...s.lifeFlight, mutualAid: { ...s.lifeFlight.mutualAid, [key]: value } } }));
  }

  function toggleLifeFlightField(key, label) {
    setState((s) => {
      const value = s.lifeFlight[key] == null ? elapsedSince() : null;
      const draft = { ...s, lifeFlight: { ...s.lifeFlight, [key]: value } };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }

  function defaultPatient() {
    return {
      age: "",
      sex: null,
      weightKg: "",
      weightLbs: "",
      problemDescription: "",
      interventions: emptyBoolMap(PATIENT_INTERVENTION_ITEMS),
      interventionOther: "",
    };
  }

  function defaultTechRescuePatient() {
    return {
      rescueOrRecovery: null,
      age: "",
      sex: null,
      weightKg: "",
      weightLbs: "",
      problemDescription: "",
    };
  }
  const defaultTrenchPatient = defaultTechRescuePatient;
  const defaultRopePatient = defaultTechRescuePatient;

  function setTechRescuePatientField(space, index, key, value, logText) {
    setState((s) => {
      const patients = [...s[space].patients];
      while (patients.length <= index) patients.push(defaultTechRescuePatient());
      patients[index] = { ...patients[index], [key]: value };
      const draft = { ...s, [space]: { ...s[space], patients } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  const setTrenchPatientField = (index, key, value, logText) => setTechRescuePatientField("trenchRescue", index, key, value, logText);
  const setRopePatientField = (index, key, value, logText) => setTechRescuePatientField("ropeRescue", index, key, value, logText);

  function handleTechRescuePatientWeightChange(space, index, unit, value) {
    setState((s) => {
      const patients = [...s[space].patients];
      while (patients.length <= index) patients.push(defaultTechRescuePatient());
      const num = parseFloat(value);
      let weightKg = patients[index].weightKg;
      let weightLbs = patients[index].weightLbs;
      if (unit === "kg") {
        weightKg = value;
        weightLbs = value === "" || isNaN(num) ? "" : (num * 2.20462).toFixed(1);
      } else {
        weightLbs = value;
        weightKg = value === "" || isNaN(num) ? "" : (num / 2.20462).toFixed(1);
      }
      patients[index] = { ...patients[index], weightKg, weightLbs };
      return { ...s, [space]: { ...s[space], patients } };
    });
  }
  const handleTrenchPatientWeightChange = (index, unit, value) => handleTechRescuePatientWeightChange("trenchRescue", index, unit, value);
  const handleRopePatientWeightChange = (index, unit, value) => handleTechRescuePatientWeightChange("ropeRescue", index, unit, value);

  function setPatientFieldGeneric(space, index, key, value, logText) {
    setState((s) => {
      const patients = [...s[space].patients];
      while (patients.length <= index) patients.push(defaultPatient());
      patients[index] = { ...patients[index], [key]: value };
      const draft = { ...s, [space]: { ...s[space], patients } };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  const setPatientField = (index, key, value, logText) => setPatientFieldGeneric("lifeFlight", index, key, value, logText);
  const setWildlandPatientField = (index, key, value, logText) => setPatientFieldGeneric("wildland", index, key, value, logText);

  function togglePatientInterventionGeneric(space, index, key, label) {
    setState((s) => {
      const patients = [...s[space].patients];
      while (patients.length <= index) patients.push(defaultPatient());
      const current = patients[index].interventions[key];
      const value = current == null ? elapsedSince() : null;
      patients[index] = { ...patients[index], interventions: { ...patients[index].interventions, [key]: value } };
      const draft = { ...s, [space]: { ...s[space], patients } };
      addLog(draft, `Patient ${index + 1} — ${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  const togglePatientIntervention = (index, key, label) => togglePatientInterventionGeneric("lifeFlight", index, key, label);
  const toggleWildlandPatientIntervention = (index, key, label) => togglePatientInterventionGeneric("wildland", index, key, label);

  function handlePatientWeightChangeGeneric(space, index, unit, value) {
    setState((s) => {
      const patients = [...s[space].patients];
      while (patients.length <= index) patients.push(defaultPatient());
      const num = parseFloat(value);
      let weightKg = patients[index].weightKg;
      let weightLbs = patients[index].weightLbs;
      if (unit === "kg") {
        weightKg = value;
        weightLbs = value === "" || isNaN(num) ? "" : (num * 2.20462).toFixed(1);
      } else {
        weightLbs = value;
        weightKg = value === "" || isNaN(num) ? "" : (num / 2.20462).toFixed(1);
      }
      patients[index] = { ...patients[index], weightKg, weightLbs };
      return { ...s, [space]: { ...s[space], patients } };
    });
  }
  const handlePatientWeightChange = (index, unit, value) => handlePatientWeightChangeGeneric("lifeFlight", index, unit, value);
  const handleWildlandPatientWeightChange = (index, unit, value) => handlePatientWeightChangeGeneric("wildland", index, unit, value);

  function addUnitGeneric(space, listKey) {
    setState((s) => ({
      ...s,
      [space]: { ...s[space], [listKey]: [...s[space][listKey], { id: uid(), unit: "", assign: "", staged: null, onDeck: null, onDeckSide: null }] },
    }));
  }
  const addLifeFlightUnit = (listKey) => addUnitGeneric("lifeFlight", listKey);
  const addWildlandUnit = (listKey) => addUnitGeneric("wildland", listKey);
  const addNinetyNineBravoUnit = (listKey) => addUnitGeneric("ninetyNineBravo", listKey);
  const addGasLeakUnit = (listKey) => addUnitGeneric("gasLeak", listKey);
  const addLithiumIonUnit = (listKey) => addUnitGeneric("lithiumIon", listKey);

  function updateUnitGeneric(space, listKey, id, field, value) {
    setState((s) => {
      let list = s[space][listKey].map((u) => (u.id === id ? { ...u, [field]: value } : u));
      if (field === "unit" && listKey === "emsUnits" && space !== "ninetyNineBravo" && space !== "gasLeak" && space !== "lithiumIon") {
        list = list.map((u) => (u.id === id && value && !u.assign ? { ...u, assign: "Medical Group" } : u));
      }
      const draft = { ...s, [space]: { ...s[space], [listKey]: list } };
      const u = list.find((x) => x.id === id);
      if ((field === "assign" && value) || (field === "unit" && listKey === "emsUnits" && value && u.assign)) {
        addLog(draft, `${u.unit || "Unit"} assigned to ${u.assign}`);
      }
      return draft;
    });
  }
  const updateLifeFlightUnit = (listKey, id, field, value) => updateUnitGeneric("lifeFlight", listKey, id, field, value);
  const updateWildlandUnit = (listKey, id, field, value) => updateUnitGeneric("wildland", listKey, id, field, value);
  const updateNinetyNineBravoUnit = (listKey, id, field, value) => updateUnitGeneric("ninetyNineBravo", listKey, id, field, value);
  const updateGasLeakUnit = (listKey, id, field, value) => updateUnitGeneric("gasLeak", listKey, id, field, value);
  const updateLithiumIonUnit = (listKey, id, field, value) => updateUnitGeneric("lithiumIon", listKey, id, field, value);

  function removeUnitGeneric(space, listKey, id) {
    setState((s) => ({
      ...s,
      [space]: { ...s[space], [listKey]: s[space][listKey].filter((u) => u.id !== id) },
    }));
  }
  const removeLifeFlightUnit = (listKey, id) => removeUnitGeneric("lifeFlight", listKey, id);
  const removeWildlandUnit = (listKey, id) => removeUnitGeneric("wildland", listKey, id);
  const removeNinetyNineBravoUnit = (listKey, id) => removeUnitGeneric("ninetyNineBravo", listKey, id);
  const removeGasLeakUnit = (listKey, id) => removeUnitGeneric("gasLeak", listKey, id);
  const removeLithiumIonUnit = (listKey, id) => removeUnitGeneric("lithiumIon", listKey, id);

  function setTaskBoxSegment(key, mode, label) {
    setState((s) => {
      const current = s.taskBoxSegments[key];
      const value = current === mode ? null : mode;
      const draft = { ...s, taskBoxSegments: { ...s.taskBoxSegments, [key]: value } };
      addLog(draft, `${label} ${value ? `set to ${value}` : "cleared"}`);
      return draft;
    });
  }

  function setTaskBoxFireControlField(field, value) {
    setState((s) => {
      const draft = { ...s, taskBoxFireControl: { ...s.taskBoxFireControl, [field]: value } };
      addLog(draft, `Fire Control ${field === "side" ? "Side" : "Door"}: ${value}`);
      return draft;
    });
  }

  const [dragUnit, setDragUnit] = useState(null); // { listKey, id, unit, space }
  const [hoveredTaskBox, setHoveredTaskBox] = useState(null);

  function startUnitDrag(e, listKey, unit, space) {
    e.preventDefault();
    setDragUnit({ listKey, id: unit.id, unit: unit.unit, space: space || "structureFire" });
  }

  useEffect(() => {
    if (!dragUnit) return;
    function findBox(clientX, clientY) {
      const el = document.elementFromPoint(clientX, clientY);
      const box = el && el.closest("[data-task-box]");
      return box ? box.getAttribute("data-task-box") : null;
    }
    function handleMove(e) {
      const t = e.touches ? e.touches[0] : e;
      setHoveredTaskBox(findBox(t.clientX, t.clientY));
    }
    function handleUp(e) {
      const t = e.changedTouches ? e.changedTouches[0] : e;
      const label = findBox(t.clientX, t.clientY);
      if (label) {
        if (dragUnit.space === "wildland") {
          const isOfficerZone = label.endsWith(" Officer");
          const isRestrictedUnit = WILDLAND_DIVISION_OFFICER_UNITS.includes(dragUnit.unit);
          if (isRestrictedUnit && !isOfficerZone) {
            // BC/Command units can only be dropped into a Division Officer zone
          } else if (!isRestrictedUnit && isOfficerZone) {
            // Non-BC units cannot be dropped into a Division Officer zone
          } else if (isOfficerZone) {
            const letter = WILDLAND_DIVISION_LETTERS[label.replace(" Officer", "")];
            updateWildlandUnit(dragUnit.listKey, dragUnit.id, "assign", `Division ${letter}`);
          } else {
            updateWildlandUnit(dragUnit.listKey, dragUnit.id, "assign", label);
          }
        } else {
          updateAlarmUnit(dragUnit.listKey, dragUnit.id, "assign", label);
        }
      }
      setDragUnit(null);
      setHoveredTaskBox(null);
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragUnit]);

  function addAlarmUnit(listKey) {
    setState((s) => ({
      ...s,
      [listKey]: [...s[listKey], { id: uid(), unit: "", staged: null, onDeck: null, onDeckSide: null, assign: "" }],
    }));
  }

  function updateAlarmUnit(listKey, id, field, value) {
    setState((s) => {
      const newList = s[listKey].map((u) => (u.id === id ? { ...u, [field]: value } : u));
      const draft = { ...s, [listKey]: newList };
      if (field === "assign" && value) {
        const u = newList.find((x) => x.id === id);
        addLog(draft, `${u.unit || "Unit"} assigned to ${value}`);
      }
      return draft;
    });
  }

  function toggleAlarmStaged(listKey, id) {
    setState((s) => {
      const list = s[listKey].map((u) => {
        if (u.id !== id) return u;
        const staged = u.staged == null ? elapsedSince() : null;
        let assign = u.assign;
        if (staged != null) {
          assign = "Staged";
        } else if (u.assign === "Staged") {
          assign = "";
        }
        return { ...u, staged, assign };
      });
      const draft = { ...s, [listKey]: list };
      const u = list.find((x) => x.id === id);
      addLog(draft, `${u.unit || "Unit"} ${u.staged == null ? "un-staged" : "staged"}`);
      return draft;
    });
  }

  const RH_UNITS = ["RH-1", "RH-2"];

  function toggleAlarmOnDeck(listKey, id) {
    setState((s) => {
      const list = s[listKey].map((u) => {
        if (u.id !== id) return u;
        const onDeck = u.onDeck == null ? elapsedSince() : null;
        let assign = u.assign;
        if (onDeck != null) {
          assign = "On-Deck";
        } else if (u.assign === "On-Deck") {
          assign = "";
        }
        return { ...u, onDeck, assign };
      });
      let draft = { ...s, [listKey]: list };
      const u = list.find((x) => x.id === id);
      addLog(draft, `${u.unit || "Unit"} ${u.onDeck == null ? "off On-Deck" : "On-Deck"}`);

      if (RH_UNITS.includes(u.unit) && u.onDeck != null) {
        const medicalRehab = { ...draft.medicalRehab };
        if (medicalRehab.rehab == null) medicalRehab.rehab = elapsedSince();
        if (u.onDeckSide) medicalRehab.rehabSide = u.onDeckSide;
        draft = { ...draft, medicalRehab };
        addLog(draft, `${u.unit} On-Deck — Rehab confirmed`);
      }

      return draft;
    });
  }

  function setAlarmOnDeckSide(listKey, id, side) {
    setState((s) => {
      const list = s[listKey].map((u) => (u.id === id ? { ...u, onDeckSide: side } : u));
      let draft = { ...s, [listKey]: list };
      const u = list.find((x) => x.id === id);
      addLog(draft, `${u.unit || "Unit"} On-Deck Side: ${side}`);

      if (RH_UNITS.includes(u.unit) && u.onDeck != null) {
        const medicalRehab = { ...draft.medicalRehab, rehabSide: side };
        if (medicalRehab.rehab == null) medicalRehab.rehab = elapsedSince();
        draft = { ...draft, medicalRehab };
        addLog(draft, `${u.unit} Rehab Side: ${side}`);
      }

      return draft;
    });
  }

  function removeAlarmUnit(listKey, id) {
    setState((s) => ({ ...s, [listKey]: s[listKey].filter((u) => u.id !== id) }));
  }

  function addEmsAlarmUnit(listKey) {
    setState((s) => ({
      ...s,
      [listKey]: [...s[listKey], { id: uid(), unit: "", assign: "" }],
    }));
  }

  function updateEmsAlarmUnit(listKey, id, field, value) {
    setState((s) => {
      let list = s[listKey].map((u) => (u.id === id ? { ...u, [field]: value } : u));
      if (field === "unit") {
        list = list.map((u) => (u.id === id && value && !u.assign ? { ...u, assign: "Medical Group" } : u));
      }
      let draft = { ...s, [listKey]: list };
      const u = list.find((x) => x.id === id);

      if (((field === "assign" && value) || (field === "unit" && value)) && u.assign) {
        const medicalRehab = { ...draft.medicalRehab };
        if (medicalRehab.medical == null) medicalRehab.medical = elapsedSince();
        draft = { ...draft, medicalRehab };
        addLog(draft, `${u.unit || "EMS unit"} assigned to ${u.assign} — Medical confirmed`);
      }

      return draft;
    });
  }

  function removeEmsAlarmUnit(listKey, id) {
    setState((s) => ({ ...s, [listKey]: s[listKey].filter((u) => u.id !== id) }));
  }

  function callPAR() {
    setState((s) => {
      const draft = { ...s, parLog: [elapsedSince(), ...s.parLog] };
      addLog(draft, "PAR called — all members accounted for");
      return draft;
    });
  }

  function addNote() {
    const text = noteText.trim();
    if (!text) return;
    setState((s) => {
      const draft = { ...s };
      addLog(draft, text);
      return draft;
    });
    setNoteText("");
  }

  const lastPar = state.parLog[0];
  const parDue = parReminder && state.startTime && (lastPar == null ? elapsedSince() : elapsedSince() - lastPar) >= 600000;

  const assignedEmsUnits = [...state.firstAlarmEmsUnits, ...state.secondAlarmEmsUnits, ...state.thirdAlarmEmsUnits, ...state.fourthAlarmEmsUnits]
    .filter((u) => u.assign && u.unit)
    .map((u) => u.unit)
    .filter((u, i, arr) => arr.indexOf(u) === i);

  const assignedRehabUnits = [...state.firstAlarmUnits, ...state.secondAlarmUnits, ...state.thirdAlarmUnits, ...state.fourthAlarmUnits]
    .filter((u) => ["RH-1", "RH-2"].includes(u.unit) && u.onDeck != null)
    .map((u) => u.unit)
    .filter((u, i, arr) => arr.indexOf(u) === i);

  const patientCountRaw = parseInt(
    state.lifeFlight.numberOfPatients === "Other" ? state.lifeFlight.numberOfPatientsOther : state.lifeFlight.numberOfPatients,
    10
  );
  const patientCount = patientCountRaw > 0 ? patientCountRaw : 1;

  const trenchPatientCountRaw = parseInt(
    state.trenchRescue.numberOfPatients === "Other" ? state.trenchRescue.numberOfPatientsOther : state.trenchRescue.numberOfPatients,
    10
  );
  const trenchPatientCount = trenchPatientCountRaw > 0 ? trenchPatientCountRaw : 1;

  const ropePatientCountRaw = parseInt(
    state.ropeRescue.numberOfPatients === "Other" ? state.ropeRescue.numberOfPatientsOther : state.ropeRescue.numberOfPatients,
    10
  );
  const ropePatientCount = ropePatientCountRaw > 0 ? ropePatientCountRaw : 1;

  const alarmLevelNum = parseInt(state.alarmLevel === "Other" ? state.alarmLevelOther : state.alarmLevel, 10);
  const alarmPanels = [
    { key: "firstAlarmUnits", emsKey: "firstAlarmEmsUnits", title: "First Alarm" },
    { key: "secondAlarmUnits", emsKey: "secondAlarmEmsUnits", title: "Second Alarm" },
  ];
  if (alarmLevelNum >= 3) alarmPanels.push({ key: "thirdAlarmUnits", emsKey: "thirdAlarmEmsUnits", title: "Third Alarm" });
  if (alarmLevelNum >= 4) alarmPanels.push({ key: "fourthAlarmUnits", emsKey: "fourthAlarmEmsUnits", title: "Fourth Alarm" });

  const allSuppressionUnits = [...state.firstAlarmUnits, ...state.secondAlarmUnits, ...state.thirdAlarmUnits, ...state.fourthAlarmUnits];
  const additionalRitAssigned = allSuppressionUnits.filter((u) => u.assign === "RIT").length >= 2;
  const additionalDivisionAssigned = allSuppressionUnits.filter((u) => u.assign === "Division").length >= 2;

  const activeTacticalUnits = allSuppressionUnits
    .filter((u) => u.unit && (u.staged != null || u.onDeck != null || u.assign))
    .map((u) => u.unit)
    .filter((u, i, arr) => arr.indexOf(u) === i);
  const maydayManagerLabel =
    state.mayday.managerType === "Division"
      ? `Division${state.mayday.managerDivision ? " " + state.mayday.managerDivision : ""}`
      : state.mayday.managerType === "Other"
      ? state.mayday.managerOther || "Other"
      : state.mayday.managerType;

  const maydayUnitLabel =
    state.mayday.whoName || state.mayday.whoUnit ? `${state.mayday.whoName || "—"} / ${state.mayday.whoUnit || "—"}` : null;

  const maydayRescueGroupLabel =
    state.mayday.rescueGroup && state.mayday.rescueGroup.length > 0
      ? state.mayday.rescueGroup.map((u) => (u === "Other" ? state.mayday.rescueGroupOther || "Other" : u)).join(", ")
      : null;

  const tacticalIcUnit = allSuppressionUnits.find((u) => u.assign === "Incident Command");
  const tacticalDivisionUnits = allSuppressionUnits.filter((u) => u.assign && u.assign.startsWith("Division "));

  const lifeFlightIcUnit = state.lifeFlight.suppressionUnits.find((u) => u.assign === "Incident Command");
  const lifeFlightGroundContactUnit = state.lifeFlight.suppressionUnits.find((u) => u.assign === "Ground Contact");

  const SF_UNITS = ["SF-1", "SF-2", "SF-3", "SF-4", "SF-5", "SF-6"];
  const safetyOnScene = [...state.firstAlarmUnits, ...state.secondAlarmUnits].some(
    (u) => SF_UNITS.includes(u.unit) && u.onDeck != null
  );

  const wildlandAssignedEmsUnits = state.wildland.emsUnits
    .filter((u) => u.assign && u.unit)
    .map((u) => u.unit)
    .filter((u, i, arr) => arr.indexOf(u) === i);

  const wildlandAssignedRehabUnits = state.wildland.suppressionUnits
    .filter((u) => ["RH-1", "RH-2"].includes(u.unit) && u.onDeck != null)
    .map((u) => u.unit)
    .filter((u, i, arr) => arr.indexOf(u) === i);

  const wildlandSafetyOnScene = state.wildland.suppressionUnits.some((u) => SF_UNITS.includes(u.unit) && u.onDeck != null);

  function getTechRescueDerived(space) {
    const allUnits = [...state[space].suppressionUnits, ...state[space].emsUnits];
    return {
      allUnits,
      safetyUnit:
        allSuppressionUnits.find((u) => SF_UNITS.includes(u.unit) && (u.staged != null || u.onDeck != null || u.assign)) ||
        allUnits.find((u) => u.assign === "Safety"),
      rehabUnit:
        allSuppressionUnits.find((u) => RH_UNITS.includes(u.unit) && (u.staged != null || u.onDeck != null || u.assign)) ||
        allUnits.find((u) => u.assign === "Rehab Group"),
      icUnit: allUnits.find((u) => u.assign === "Incident Command"),
      rescueGroupUnit: allUnits.find((u) => u.assign === "Rescue Group"),
      rescueUnitUnit: allUnits.find((u) => u.assign === "Rescue Unit"),
      ritUnit: allUnits.find((u) => u.assign === "RIT"),
      medicalGroupUnit: allUnits.find((u) => u.assign === "Medical Group"),
      medicalUnitUnit: allUnits.find((u) => u.assign === "Medical Unit"),
      deconGroupUnit: allUnits.find((u) => u.assign === "Decon Group"),
    };
  }

  const hazmatDerived = getTechRescueDerived("hazmat");
  const gasLeakDerived = getTechRescueDerived("gasLeak");
  const lithiumIonDerived = getTechRescueDerived("lithiumIon");
  const confinedSpaceDerived = getTechRescueDerived("confinedSpace");
  const allConfinedSpaceUnits = confinedSpaceDerived.allUnits;
  const confinedSpaceSafetyUnit = confinedSpaceDerived.safetyUnit;
  const confinedSpaceRehabUnit = confinedSpaceDerived.rehabUnit;
  const confinedSpaceIcUnit = confinedSpaceDerived.icUnit;
  const confinedSpaceRescueGroupUnit = confinedSpaceDerived.rescueGroupUnit;
  const confinedSpaceRescueUnitUnit = confinedSpaceDerived.rescueUnitUnit;
  const confinedSpaceRitUnit = confinedSpaceDerived.ritUnit;
  const confinedSpaceMedicalGroupUnit = confinedSpaceDerived.medicalGroupUnit;
  const confinedSpaceMedicalUnitUnit = confinedSpaceDerived.medicalUnitUnit;
  const confinedSpaceDeconGroupUnit = confinedSpaceDerived.deconGroupUnit;

  const ropeRescueDerived = getTechRescueDerived("ropeRescue");
  const allRopeRescueUnits = ropeRescueDerived.allUnits;
  const ropeRescueSafetyUnit = ropeRescueDerived.safetyUnit;
  const ropeRescueRehabUnit = ropeRescueDerived.rehabUnit;
  const ropeRescueIcUnit = ropeRescueDerived.icUnit;
  const ropeRescueRescueGroupUnit = ropeRescueDerived.rescueGroupUnit;
  const ropeRescueRescueUnitUnit = ropeRescueDerived.rescueUnitUnit;
  const ropeRescueRitUnit = ropeRescueDerived.ritUnit;
  const ropeRescueMedicalGroupUnit = ropeRescueDerived.medicalGroupUnit;
  const ropeRescueMedicalUnitUnit = ropeRescueDerived.medicalUnitUnit;
  const ropeRescueDeconGroupUnit = ropeRescueDerived.deconGroupUnit;
  const ropeRescueRoofSectorUnit = allRopeRescueUnits.find((u) => u.assign === "Roof Sector");
  const ropeRescueTurntableUnit = allRopeRescueUnits.find((u) => u.assign === "Turntable");
  const ropeRescueLandingZoneUnit = allRopeRescueUnits.find((u) => u.assign === "Landing Zone");

  const trenchRescueDerived = getTechRescueDerived("trenchRescue");
  const allTrenchRescueUnits = trenchRescueDerived.allUnits;
  const trenchRescueSafetyUnit = trenchRescueDerived.safetyUnit;
  const trenchRescueRehabUnit = trenchRescueDerived.rehabUnit;
  const trenchRescueIcUnit = trenchRescueDerived.icUnit;
  const trenchRescueRescueGroupUnit = trenchRescueDerived.rescueGroupUnit;
  const trenchRescueRescueUnitUnit = trenchRescueDerived.rescueUnitUnit;
  const trenchRescueRitUnit = trenchRescueDerived.ritUnit;
  const trenchRescueMedicalGroupUnit = trenchRescueDerived.medicalGroupUnit;
  const trenchRescueMedicalUnitUnit = trenchRescueDerived.medicalUnitUnit;
  const trenchRescueDeconGroupUnit = trenchRescueDerived.deconGroupUnit;

  const structuralCollapseDerived = getTechRescueDerived("structuralCollapse");
  const allStructuralCollapseUnits = structuralCollapseDerived.allUnits;
  const waterRescueDerived = getTechRescueDerived("waterRescue");
  const structuralCollapseSafetyUnit = structuralCollapseDerived.safetyUnit;
  const structuralCollapseRehabUnit = structuralCollapseDerived.rehabUnit;
  const structuralCollapseIcUnit = structuralCollapseDerived.icUnit;
  const structuralCollapseRescueGroupUnit = structuralCollapseDerived.rescueGroupUnit;
  const structuralCollapseRescueUnitUnit = structuralCollapseDerived.rescueUnitUnit;
  const structuralCollapseRitUnit = structuralCollapseDerived.ritUnit;
  const structuralCollapseMedicalGroupUnit = structuralCollapseDerived.medicalGroupUnit;
  const structuralCollapseMedicalUnitUnit = structuralCollapseDerived.medicalUnitUnit;
  const structuralCollapseDeconGroupUnit = structuralCollapseDerived.deconGroupUnit;

  const incidentActive = !!state.startTime;

  // ---------- Pre-start screen ----------
  if (!incidentActive) {
    return (
      <div
        className="w-full min-h-screen flex items-center justify-center p-6"
        style={{ background: theme.bg, color: theme.textPrimary, fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <div
          className="w-full max-w-xl rounded-lg p-10"
          style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderTop: `5px solid ${theme.gold}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
        >
          <div className="flex items-center gap-4 mb-2">
            <BadgeIcon size={48} />
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ lineHeight: 1.1 }}>
                Incident Command Board
              </h1>
              <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: theme.gold }}>
                Cy-Fair Fire Department
              </p>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.textSecondary }}>
              Address / Location
            </label>
            <input
              value={state.address}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  address: e.target.value,
                  command: { ...s.command, name: deriveCommandName(e.target.value) },
                }))
              }
              placeholder="123 Main St"
              className="w-full px-4 py-4 rounded-lg outline-none text-lg font-semibold mb-6"
              style={{ background: theme.panelAlt, border: `2px solid ${theme.border}`, color: theme.textPrimary }}
            />

            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.textSecondary }}>
              Incident Type
            </label>
            <select
              value={state.incidentType}
              onChange={(e) => setState((s) => ({ ...s, incidentType: e.target.value }))}
              className="w-full px-4 py-4 rounded-lg outline-none text-lg font-semibold mb-8"
              style={{ background: theme.panelAlt, border: `2px solid ${theme.border}`, color: theme.textPrimary }}
            >
              <option value="">Select incident type</option>
              {["Structure Fire", "Wildland Fire", "Life Flight", "Special Operations", "99-Bravo"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={startIncident}
            className="w-full flex items-center justify-center gap-3 py-5 rounded-lg font-bold text-xl uppercase tracking-wide"
            style={{ background: theme.red, color: "#fff", boxShadow: `0 8px 24px ${theme.red}66` }}
          >
            <Play size={26} fill="#fff" />
            Start Incident
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{ background: theme.bg, color: theme.textPrimary, fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Top bar */}
      <div style={{ background: theme.panel, borderBottom: `1px solid ${theme.border}` }}>
        <div className="flex items-center gap-3 px-4 py-2">
          <BadgeIcon size={24} />
          <div className="min-w-0">
            <input
              value={state.address}
              onChange={(e) => setState((s) => ({ ...s, address: e.target.value }))}
              placeholder="Address"
              className="font-bold text-sm bg-transparent outline-none w-40"
              style={{ color: theme.textPrimary }}
            />
            <input
              value={state.incidentType}
              onChange={(e) => setState((s) => ({ ...s, incidentType: e.target.value }))}
              placeholder="Incident type"
              className="text-xs bg-transparent outline-none w-40 block"
              style={{ color: theme.textSecondary }}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {tab === "log" && (
              <>
                <button
                  onClick={saveLogFile}
                  className="px-3 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textSecondary }}
                >
                  Save Log
                </button>
                <button
                  onClick={emailLogFile}
                  className="px-3 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textSecondary }}
                >
                  Email Log
                </button>
              </>
            )}
            <button
              onClick={endIncident}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold"
              style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textSecondary }}
            >
              <Square size={12} />
              END
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-2" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
          {state.command.unit && (
            <div
              className="px-2 py-1.5 rounded text-xs font-bold"
              style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red, fontFamily: mono }}
            >
              Command: {state.command.unit}
            </div>
          )}
          {tab === "mayday" ? (
            <div className="flex flex-wrap items-center gap-2">
              {maydayUnitLabel && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red }}
                >
                  MAYDAY Unit: {maydayUnitLabel}
                </div>
              )}
              {maydayManagerLabel && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red }}
                >
                  Rescue Group: {maydayManagerLabel}
                </div>
              )}
              {maydayRescueGroupLabel && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red }}
                >
                  Rescue Group: {maydayRescueGroupLabel}
                </div>
              )}
            </div>
          ) : tab === "worksheet" ? (
            <div className="flex flex-wrap items-center gap-2">
              {tacticalIcUnit && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red }}
                >
                  IC: {tacticalIcUnit.unit || "—"}
                </div>
              )}
              {tacticalDivisionUnits.map((u) => (
                <div
                  key={u.id}
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.blueDim, border: `1px solid ${theme.blue}`, color: theme.blue }}
                >
                  {u.assign}: {u.unit || "—"}
                </div>
              ))}
              <div className="flex items-center rounded overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
                {STRATEGIES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setCommand("strategy", st, `Strategy declared: ${st}`)}
                    className="px-2.5 py-1.5 text-xs font-bold"
                    style={{
                      background: state.command.strategy === st ? (st === "Offensive" ? theme.red : st === "Defensive" ? theme.blue : theme.amber) : "transparent",
                      color: state.command.strategy === st ? "#fff" : theme.textSecondary,
                    }}
                  >
                    {st.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ) : tab === "lifeflight" ? (
            <div className="flex flex-wrap items-center gap-2">
              {lifeFlightIcUnit && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red }}
                >
                  IC: {lifeFlightIcUnit.unit || "—"}
                </div>
              )}
              {lifeFlightGroundContactUnit && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.blueDim, border: `1px solid ${theme.blue}`, color: theme.blue }}
                >
                  Ground Contact: {lifeFlightGroundContactUnit.unit || "—"}
                </div>
              )}

              {state.lifeFlight.lifeFlightUnit && (
                <div
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                >
                  Life Flight Unit: {state.lifeFlight.lifeFlightUnit === "Other" ? state.lifeFlight.lifeFlightUnitOther || "Other" : state.lifeFlight.lifeFlightUnit}
                </div>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleLifeFlightField("safelyOnGround", "SAFELY ON THE GROUND")}
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{
                    background: state.lifeFlight.safelyOnGround != null ? theme.green : theme.panelAlt,
                    border: `1px solid ${state.lifeFlight.safelyOnGround != null ? theme.green : theme.border}`,
                    color: state.lifeFlight.safelyOnGround != null ? "#fff" : theme.textSecondary,
                  }}
                >
                  SAFELY ON THE GROUND
                </button>
                <button
                  onClick={() => toggleLifeFlightField("safelyOffGround", "SAFELY OFF THE GROUND")}
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{
                    background: state.lifeFlight.safelyOffGround != null ? theme.green : theme.panelAlt,
                    border: `1px solid ${state.lifeFlight.safelyOffGround != null ? theme.green : theme.border}`,
                    color: state.lifeFlight.safelyOffGround != null ? "#fff" : theme.textSecondary,
                  }}
                >
                  SAFELY OFF THE GROUND
                </button>
              </div>
            </div>
          ) : tab === "specialops" &&
            specialOpsSubTab === "Technical Rescue" &&
            ["Rope Rescue", "Trench Rescue", "Confined Space", "Structural Collapse", "Water Rescue"].includes(techRescueSubTab) ? (
            <div className="flex flex-wrap items-center gap-2">
              {(() => {
                const derivedMap = {
                  "Rope Rescue": ropeRescueDerived,
                  "Trench Rescue": trenchRescueDerived,
                  "Confined Space": confinedSpaceDerived,
                  "Structural Collapse": structuralCollapseDerived,
                  "Water Rescue": waterRescueDerived,
                };
                const d = derivedMap[techRescueSubTab];
                const icUnit = d.icUnit;
                const rescueGroupUnit = d.rescueGroupUnit;
                const rescueUnitUnit = d.rescueUnitUnit;
                const safetyUnit = d.safetyUnit;
                return (
                  <>
                    {icUnit && (
                      <div
                        className="px-2 py-1.5 rounded text-xs font-bold"
                        style={{ background: theme.redDim, border: `1px solid ${theme.red}`, color: theme.red }}
                      >
                        IC: {icUnit.unit || "—"}
                      </div>
                    )}
                    {rescueGroupUnit && (
                      <div
                        className="px-2 py-1.5 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        Rescue Group: {rescueGroupUnit.unit || "—"}
                      </div>
                    )}
                    {rescueUnitUnit && (
                      <div
                        className="px-2 py-1.5 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        Rescue Unit: {rescueUnitUnit.unit || "—"}
                      </div>
                    )}
                    {safetyUnit && (
                      <div
                        className="px-2 py-1.5 rounded text-xs font-bold"
                        style={{ background: theme.blueDim, border: `1px solid ${theme.blue}`, color: theme.blue }}
                      >
                        Safety: {safetyUnit.unit || "—"}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : null}

          <button
            onClick={callPAR}
            className={`px-3 py-1.5 rounded text-xs font-bold ml-auto ${parDue ? "animate-pulse" : ""}`}
            style={{
              background: parDue ? theme.red : theme.panelAlt,
              border: `1px solid ${parDue ? theme.red : theme.border}`,
              color: parDue ? "#fff" : theme.textSecondary,
            }}
          >
            CALL PAR {lastPar != null ? `· ${formatElapsed(lastPar)}` : ""}
          </button>

          <div
            className="px-3 py-1.5 rounded font-bold text-2xl tabular-nums"
            style={{ fontFamily: mono, background: theme.panelAlt, border: `1px solid ${theme.border}` }}
          >
            {formatElapsed(elapsedSince())}
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 flex-col">
        {/* View toggle */}
        <div className="flex items-center gap-2 px-4 py-2" style={{ background: theme.panel, borderBottom: `1px solid ${theme.border}` }}>
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            const accentColor = theme.gold;
            const accentDim = theme.goldDim;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold"
                style={{ background: active ? accentDim : "transparent", color: active ? accentColor : theme.textDim, border: `1px solid ${active ? accentColor : "transparent"}` }}
              >
                <Icon size={14} />
                {t.label}
                {t.key === "log" && state.log.length > 0 && (
                  <span className="text-[10px] px-1.5 rounded-full" style={{ background: theme.borderSoft, color: theme.textSecondary }}>
                    {state.log.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "worksheet" && (
            <div className="flex flex-col gap-6">
          <GroupHeader>Size-Up</GroupHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Size">
                {SIZE_OPTS.map((o) => (
                  <Pill key={o} active={state.sizeUp.size === o} onClick={() => setSizeUp("size", o, `Size: ${o}`)}>
                    {o}
                  </Pill>
                ))}
              </Section>

              <Section title="Height">
                {HEIGHT_OPTS.map((o) => (
                  <Pill key={o} active={state.sizeUp.height === o} onClick={() => setSizeUp("height", o, `Height: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                {state.sizeUp.height === "Other" && (
                  <TextField
                    className="mt-2"
                    value={state.sizeUp.heightOther}
                    onChange={(v) => setSizeUp("heightOther", v)}
                    placeholder="Specify story count"
                  />
                )}
              </Section>

              <Section title="Occupancy">
                {OCCUPANCY_OPTS.map((o) => (
                  <Pill key={o} active={state.sizeUp.occupancy === o} onClick={() => setSizeUp("occupancy", o, `Occupancy: ${o}`)}>
                    {o}
                  </Pill>
                ))}
              </Section>

              <Section title="Problem">
                {PROBLEM_OPTS.map((o) => (
                  <Pill key={o} active={state.sizeUp.problem === o} onClick={() => setSizeUp("problem", o, `Problem: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                {state.sizeUp.problem === "Smoke Showing" && (
                  <div className="mt-2">
                    {["Light", "Heavy"].map((o) => (
                      <Pill key={o} active={state.sizeUp.smokeLevel === o} onClick={() => setSizeUp("smokeLevel", o, `Smoke: ${o}`)} color={theme.amber}>
                        {o}
                      </Pill>
                    ))}
                  </div>
                )}
                {state.sizeUp.problem === "Fire Showing" && (
                  <div className="mt-2">
                    {["Working", "Defensive"].map((o) => (
                      <Pill key={o} active={state.sizeUp.fireMode === o} onClick={() => setSizeUp("fireMode", o, `Fire: ${o}`)} color={theme.red}>
                        {o}
                      </Pill>
                    ))}
                  </div>
                )}
              </Section>

              <Section title="Location">
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Floor
                  </label>
                  <select
                    value={state.sizeUp.floor}
                    onChange={(e) => setSizeUp("floor", e.target.value, `Location: Floor ${e.target.value}`)}
                    className="px-3 py-2 rounded text-sm outline-none w-24"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">—</option>
                    {["1", "2", "3", "4", "Other"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {state.sizeUp.floor === "Other" && (
                    <TextField
                      className="mt-2 w-24"
                      value={state.sizeUp.floorOther}
                      onChange={(v) => setSizeUp("floorOther", v)}
                      placeholder="Specify"
                    />
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Side
                  </label>
                  {SIDE_OPTS.map((o) => (
                    <Pill key={o} active={state.sizeUp.side === o} onClick={() => setSizeUp("side", o, `Location: Side ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>
                {state.sizeUp.occupancy === "Strip Mall" && (
                  <div>
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit Position
                    </label>
                    <Pill active={state.sizeUp.centerUnit != null} onClick={() => toggleSimple("sizeUp", "centerUnit", "Center Unit")}>
                      Center Unit
                    </Pill>
                    <Pill active={state.sizeUp.endUnit != null} onClick={() => toggleSimple("sizeUp", "endUnit", "End Unit")}>
                      End Unit
                    </Pill>
                  </div>
                )}
              </Section>

              <Section title="Strategy">
                {STRATEGIES.map((st) => (
                  <Pill
                    key={st}
                    active={state.command.strategy === st}
                    onClick={() => setCommand("strategy", st, `Strategy declared: ${st}`)}
                    color={st === "Offensive" ? theme.red : st === "Defensive" ? theme.blue : theme.amber}
                  >
                    {st}
                  </Pill>
                ))}
                {(state.command.strategy === "Offensive" || state.command.strategy === "Defensive") && (
                  <div className="mt-3">
                    <CheckRow
                      label="Water Supply Established"
                      value={state.sizeUp.waterSupplyEstablished}
                      onToggle={() => toggleSimple("sizeUp", "waterSupplyEstablished", "Water Supply Established")}
                    />
                    <TextField
                      label="Unit & Location"
                      value={state.sizeUp.waterSupplyUnitLocation}
                      onChange={(v) => setSizeUp("waterSupplyUnitLocation", v)}
                      placeholder="Unit & Location"
                      className="mt-2 mb-2"
                    />
                    <CheckRow label="FDC" value={state.sizeUp.fdc} onToggle={() => toggleSimple("sizeUp", "fdc", "FDC")} />
                    {state.sizeUp.fdc != null && (
                      <div className="mt-2">
                        {SIDE_OPTS.map((o) => (
                          <Pill key={o} active={state.sizeUp.fdcSide === o} onClick={() => setSizeUp("fdcSide", o, `FDC Side: ${o}`)}>
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Section>
          </div>

          <GroupHeader>Command</GroupHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Command">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Unit
                </label>
                <select
                  value={state.command.unit || ""}
                  onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                >
                  <option value="">—</option>
                  {COMMAND_UNIT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC name" className="mb-3" />
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Command Post Location
                  </label>
                  {SIDE_OPTS.map((o) => (
                    <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    TAC Channel
                  </label>
                  <select
                    value={state.lifeFlight.tacChannel || ""}
                    onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                    className="px-3 py-2 rounded text-sm outline-none w-32"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">—</option>
                    {TAC_CHANNEL_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {state.lifeFlight.tacChannel === "Other" && (
                    <TextField className="mt-2 w-32" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                  )}
                </div>
              </Section>

              <Section title="Follow-Up">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  360
                </label>
                <CheckRow label="360" value={state.followUp.threeSixty} onToggle={() => toggleSimple("followUp", "threeSixty", "360")} />
                {state.followUp.threeSixty != null && (
                  <div className="mb-3">
                    {["Complete", "Incomplete"].map((o) => (
                      <Pill key={o} active={state.followUp.threeSixtyStatus === o} onClick={() => setFollowUp("threeSixtyStatus", o, `360° status: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                    {state.followUp.threeSixtyStatus === "Incomplete" && (
                      <div className="mt-2">
                        {["Size", "Accessibility", "Hazard", "Other"].map((o) => (
                          <Pill
                            key={o}
                            active={state.followUp.threeSixtyIncompleteReason === o}
                            onClick={() => setFollowUp("threeSixtyIncompleteReason", o, `360° Incomplete: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.followUp.threeSixtyIncompleteReason === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.followUp.threeSixtyIncompleteOther}
                            onChange={(v) => setFollowUp("threeSixtyIncompleteOther", v)}
                            placeholder="Specify"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Hazards
                  </label>
                  {["Yes", "No"].map((o) => (
                    <Pill key={o} active={state.followUp.hazardsPresent === o} onClick={() => setFollowUp("hazardsPresent", o, `Hazards: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                  {state.followUp.hazardsPresent === "Yes" && (
                    <>
                      <div className="mt-2">
                        {SIDE_OPTS.map((o) => (
                          <Pill
                            key={o}
                            active={state.followUp["hazards" + o] != null}
                            onClick={() => toggleSimple("followUp", "hazards" + o, `Hazards Side ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                      <TextField
                        className="mt-2"
                        value={state.followUp.hazards}
                        onChange={(v) => setFollowUp("hazards", v)}
                        placeholder="Note any hazards"
                      />
                    </>
                  )}
                </div>
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Exposures
                  </label>
                  {["Yes", "No"].map((o) => (
                    <Pill key={o} active={state.followUp.exposures === o} onClick={() => setFollowUp("exposures", o, `Exposures: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                  {state.followUp.exposures === "Yes" && (
                    <div className="mt-2">
                      {SIDE_OPTS.map((o) => (
                        <Pill
                          key={o}
                          active={state.followUp["exposure" + o] != null}
                          onClick={() => toggleSimple("followUp", "exposure" + o, `Exposure Side ${o}`)}
                        >
                          {o}
                        </Pill>
                      ))}
                    </div>
                  )}
                </div>
                <TextField label="TIC Reading" value={state.followUp.ticReading} onChange={(v) => setFollowUp("ticReading", v)} placeholder="Reading" className="mb-3" />
                <div>
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Accountability
                  </label>
                  {SIDE_OPTS.map((o) => (
                    <Pill key={o} active={state.followUp.accountability === o} onClick={() => setFollowUp("accountability", o, `Accountability: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>
              </Section>

              <Section title="Command Transfer">
                {COMMAND_TRANSFER_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                    {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                      <div className="mb-1.5 pl-1">
                        {["Investigative", "Offensive", "Defensive"].map((o) => (
                          <Pill
                            key={o}
                            active={state.strategyConfirmationMode === o}
                            onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                            color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Section>

              <Section title="Resources">
                {RESOURCES_ITEMS.map((it) => (
                  <CheckRow key={it.key} label={it.label} value={state.resources[it.key]} onToggle={() => toggleSimple("resources", it.key, it.label)} />
                ))}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Alarm Level
                    </label>
                    <select
                      value={state.alarmLevel}
                      onChange={(e) => setState((s) => ({ ...s, alarmLevel: e.target.value }))}
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {["1", "2", "3", "4", "Other"].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.alarmLevel === "Other" && (
                      <TextField
                        className="mt-2"
                        value={state.alarmLevelOther}
                        onChange={(v) => setState((s) => ({ ...s, alarmLevelOther: v }))}
                        placeholder="Specify"
                      />
                    )}
                  </div>
                  <TextField label="Level 2 Staging" value={state.level2Staging} onChange={(v) => setState((s) => ({ ...s, level2Staging: v }))} placeholder="Location" />
                </div>
              </Section>
          </div>

          <GroupHeader>Units & Assignments</GroupHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {alarmPanels.map(({ key, emsKey, title }) => (
                <Section key={key} title={title}>
                  <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                    Suppression
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    {state[key].map((u) => (
                      <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <div className="flex items-center gap-2">
                          <select
                            value={u.unit}
                            onChange={(e) => updateAlarmUnit(key, u.id, "unit", e.target.value)}
                            className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                            style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                          >
                            <option value="">Unit</option>
                            {UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => toggleAlarmStaged(key, u.id)}
                            className="px-2 py-1.5 rounded text-xs font-bold"
                            style={{
                              background: u.staged != null ? theme.purpleDim : theme.bg,
                              border: `1px solid ${u.staged != null ? theme.purple : theme.border}`,
                              color: u.staged != null ? theme.purple : theme.textSecondary,
                            }}
                          >
                            {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                          </button>
                          <button
                            onClick={() => toggleAlarmOnDeck(key, u.id)}
                            className="px-2 py-1.5 rounded text-xs font-bold"
                            style={{
                              background: u.onDeck != null ? theme.amberDim : theme.bg,
                              border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                              color: u.onDeck != null ? theme.amber : theme.textSecondary,
                            }}
                          >
                            {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                          </button>
                          <select
                            value={u.assign}
                            onChange={(e) => updateAlarmUnit(key, u.id, "assign", e.target.value)}
                            className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                            style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Assignment</option>
                            <option value="Division">Division</option>
                            {TASK_CHECKLIST.map((c) => (
                              <option key={c.key} value={c.label}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <button onClick={() => removeAlarmUnit(key, u.id)} style={{ color: theme.textDim }}>
                            <X size={16} />
                          </button>
                        </div>
                        {u.onDeck != null && (
                          <div className="mt-2 pl-1">
                            {SIDE_OPTS.map((o) => (
                              <Pill key={o} active={u.onDeckSide === o} onClick={() => setAlarmOnDeckSide(key, u.id, o)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                        {(u.assign === "Division" || (u.assign && u.assign.startsWith("Division "))) && (
                          <div className="mt-2 pl-1">
                            {["A", "B", "C", "D"].map((o) => (
                              <Pill key={o} active={u.assign === `Division ${o}`} onClick={() => updateAlarmUnit(key, u.id, "assign", `Division ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addAlarmUnit(key)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                    EMS
                  </div>
                  <div className="flex flex-col gap-2">
                    {state[emsKey].map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 rounded" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <select
                          value={u.unit}
                          onChange={(e) => updateEmsAlarmUnit(emsKey, u.id, "unit", e.target.value)}
                          className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                        >
                          <option value="">Unit</option>
                          {MEDIC_UNIT_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <select
                          value={u.assign}
                          onChange={(e) => updateEmsAlarmUnit(emsKey, u.id, "assign", e.target.value)}
                          className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        >
                          <option value="">Assignment</option>
                          {EMS_ASSIGNMENT_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => removeEmsAlarmUnit(emsKey, u.id)} style={{ color: theme.textDim }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addEmsAlarmUnit(emsKey)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>
                </Section>
              ))}
          </div>

          <GroupHeader>Tactical Objectives</GroupHeader>
          {tacticalDivisionUnits.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {tacticalDivisionUnits.map((u) => (
                <div
                  key={u.id}
                  className="px-2 py-1.5 rounded text-xs font-bold"
                  style={{ background: theme.blueDim, border: `1px solid ${theme.blue}`, color: theme.blue }}
                >
                  {u.assign}: {u.unit || "—"}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-row gap-3 items-stretch">
              {(() => {
                const allTacticalUnits = [
                  { listKey: "firstAlarmUnits", units: state.firstAlarmUnits },
                  { listKey: "secondAlarmUnits", units: state.secondAlarmUnits },
                  { listKey: "thirdAlarmUnits", units: state.thirdAlarmUnits },
                  { listKey: "fourthAlarmUnits", units: state.fourthAlarmUnits },
                ].flatMap(({ listKey, units }) => units.map((u) => ({ ...u, listKey })));

                function renderTaskBox(task, fill) {
                  const unitsInBox = allTacticalUnits.filter((u) => u.assign === task.label);
                  const isHovered = hoveredTaskBox === task.label;
                  const boxColor = task.key === "staged" ? theme.purple : task.key === "onDeck" ? theme.gold : theme.green;
                  const boxColorDim = task.key === "staged" ? theme.purpleDim : task.key === "onDeck" ? theme.goldDim : theme.greenDim;
                  return (
                    <div
                      key={task.key}
                      data-task-box={task.label}
                      className={`rounded-lg p-3${fill ? " h-full flex flex-col" : ""}`}
                      style={{
                        background: isHovered ? theme.goldDim : theme.panel,
                        border: `1px solid ${isHovered ? theme.gold : theme.border}`,
                      }}
                    >
                      <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                        {task.label}
                      </h3>

                      <div className={`flex flex-col gap-1.5 mb-2${fill ? " flex-1" : ""}`} style={{ minHeight: 44 }}>
                        {unitsInBox.length === 0 ? (
                          <div className="text-xs py-3 text-center rounded" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                            Drag units here
                          </div>
                        ) : (
                          unitsInBox.map((u) => (
                            <div
                              key={u.id}
                              onPointerDown={(e) => startUnitDrag(e, u.listKey, u)}
                              className="px-2 py-1.5 rounded text-sm font-bold text-center"
                              style={{
                                background: dragUnit && dragUnit.id === u.id ? theme.goldDim : boxColorDim,
                                border: `1px solid ${dragUnit && dragUnit.id === u.id ? theme.gold : boxColor}`,
                                color: dragUnit && dragUnit.id === u.id ? theme.gold : boxColor,
                                fontFamily: mono,
                                touchAction: "none",
                                cursor: "grab",
                                opacity: dragUnit && dragUnit.id === u.id ? 0.4 : 1,
                              }}
                            >
                              {u.unit || "Unit"}
                            </div>
                          ))
                        )}
                      </div>

                      {task.type === "segmented" && (
                        <div className={task.key === "primarySearch" || task.key === "secondarySearch" ? "flex flex-nowrap gap-1" : "flex flex-wrap"}>
                          {task.options.map((o) => (
                            <Pill
                              key={o}
                              compact={!(task.key === "primarySearch" || task.key === "secondarySearch")}
                              micro={task.key === "primarySearch" || task.key === "secondarySearch"}
                              active={state.taskBoxSegments[task.key] === o}
                              onClick={() => setTaskBoxSegment(task.key, o, task.label)}
                            >
                              {o}
                            </Pill>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const stagedTask = TASK_CHECKLIST.find((t) => t.key === "staged");
                const gridTasks = TASK_CHECKLIST.filter((t) => t.key !== "staged");

                return (
                  <>
                    <div style={{ width: 168 }} className="shrink-0">
                      {renderTaskBox(stagedTask, true)}
                    </div>

                    <div className="grid grid-cols-5 gap-3 flex-1">
                      {gridTasks.map((task) => renderTaskBox(task))}

                      <div className="rounded-lg p-3 h-full flex flex-col" style={{ background: theme.panel, border: `1px solid ${theme.border}` }}>
                        <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                          Medical / Rehab
                        </h3>

                        {assignedEmsUnits.length === 0 && assignedRehabUnits.length === 0 && (
                          <div className="text-xs py-3 text-center rounded flex-1" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                            No units assigned
                          </div>
                        )}

                        {assignedEmsUnits.length > 0 && (
                          <div className="mb-2">
                            <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Medical
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                              {assignedEmsUnits.map((u) => (
                                <span
                                  key={u}
                                  className="px-2 py-1.5 rounded text-xs font-bold"
                                  style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold, fontFamily: mono }}
                                >
                                  {u}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} compact active={state.medicalRehab.medicalSide === o} onClick={() => setMedicalRehabField("medicalSide", o, `Medical: Side ${o}`)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          </div>
                        )}

                        {assignedRehabUnits.length > 0 && (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Rehab
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                              {assignedRehabUnits.map((u) => (
                                <span
                                  key={u}
                                  className="px-2 py-1.5 rounded text-xs font-bold"
                                  style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold, fontFamily: mono }}
                                >
                                  {u}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} compact active={state.medicalRehab.rehabSide === o} onClick={() => setMedicalRehabField("rehabSide", o, `Rehab: Side ${o}`)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Roof Report">
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Type
                  </label>
                  {["Pitched", "Flat"].map((o) => (
                    <Pill key={o} active={state.roof.type === o} onClick={() => setRoofField("type", o, `Roof Type: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Condition
                  </label>
                  {["Stable", "Unstable"].map((o) => (
                    <Pill key={o} active={state.roof.condition === o} onClick={() => setRoofField("condition", o, `Roof Condition: ${o}`)} color={o === "Unstable" ? theme.red : theme.green}>
                      {o}
                    </Pill>
                  ))}
                </div>
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Attic
                  </label>
                  {["Involved", "No Involvement"].map((o) => (
                    <Pill
                      key={o}
                      active={state.roof.atticConditions === o}
                      onClick={() => setRoofField("atticConditions", o, `Attic: ${o}`)}
                      color={o === "Involved" ? theme.red : theme.green}
                    >
                      {o}
                    </Pill>
                  ))}
                  {state.roof.atticConditions === "Involved" && (
                    <div className="mt-2">
                      {["Fire", "Smoke"].map((o) => (
                        <Pill key={o} active={state.roof.atticInvolvement === o} onClick={() => setRoofField("atticInvolvement", o, `Attic Involvement: ${o}`)} color={theme.red}>
                          {o}
                        </Pill>
                      ))}
                    </div>
                  )}
                </div>
                {ROOF_CHECKLIST.map((c) => (
                  <CheckRow key={c.key} label={c.label} value={state.roof.checks[c.key]} onToggle={() => toggleRoof(c.key, c.label)} />
                ))}
              </Section>

              <ChecklistSection title="RIT" items={RIT_ITEMS} data={state.rit} onToggle={(k, l) => toggleSimple("rit", k, l)} />

              <ChecklistSection title="Safety" items={SAFETY_ITEMS} data={state.safety} onToggle={(k, l) => toggleSimple("safety", k, l)} glow={safetyOnScene} />
          </div>

          <GroupHeader>Support</GroupHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CollapsibleSection title="Utilities">
                {UTILITIES_ITEMS.map((it) => (
                  <CheckRow key={it.key} label={it.label} value={state.utilities[it.key]} onToggle={() => toggleSimple("utilities", it.key, it.label)} />
                ))}
              </CollapsibleSection>
              <CollapsibleSection title="Mutual Aid">
                <CheckRow label="Fire" value={state.mutualAid.fire} onToggle={() => toggleSimple("mutualAid", "fire", "Fire")} />
                {state.mutualAid.fire != null && (
                  <select
                    value={state.mutualAid.fireDept}
                    onChange={(e) => setState((s) => ({ ...s, mutualAid: { ...s.mutualAid, fireDept: e.target.value } }))}
                    className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">Select department</option>
                    {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                )}
                {MUTUAL_AID_ITEMS.filter((it) => it.key !== "fire").map((it) => (
                  <CheckRow key={it.key} label={it.label} value={state.mutualAid[it.key]} onToggle={() => toggleSimple("mutualAid", it.key, it.label)} />
                ))}
              </CollapsibleSection>
          </div>
            </div>
          )}

          {tab === "lifeflight" && (
            <div className="flex flex-col gap-6">
            <GroupHeader>Size-Up & Command</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
              <Section title="Command">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Unit
                </label>
                <select
                  value={state.command.unit || ""}
                  onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                >
                  <option value="">—</option>
                  {COMMAND_UNIT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Command Post Location
                </label>
                {SIDE_OPTS.map((o) => (
                  <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                    {o}
                  </Pill>
                ))}

                <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                  Command Transfer
                </div>
                {LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                    {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                      <div className="mb-1.5 pl-1">
                        {["Investigative", "Offensive", "Defensive"].map((o) => (
                          <Pill
                            key={o}
                            active={state.strategyConfirmationMode === o}
                            onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                            color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Section>

              <div className="flex-1">
              <Section title="Communications" fill>
                <div className="mb-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    TAC Channel
                  </label>
                  <select
                    value={state.lifeFlight.tacChannel || ""}
                    onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                    className="px-3 py-2 rounded text-sm outline-none w-32"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">—</option>
                    {TAC_CHANNEL_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {state.lifeFlight.tacChannel === "Other" && (
                    <TextField className="mt-2 w-32" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Ground Contact Channel
                  </label>
                  {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                    <Pill
                      key={o}
                      active={state.lifeFlight.groundContactChannel === o}
                      onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                    >
                      {o}
                    </Pill>
                  ))}
                  {state.lifeFlight.groundContactChannel === "Other" && (
                    <TextField
                      className="mt-2 w-32"
                      value={state.lifeFlight.groundContactChannelOther}
                      onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                      placeholder="Specify"
                    />
                  )}
                </div>

                <div className="mt-3">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Life Flight Unit
                  </label>
                  <select
                    value={state.lifeFlight.lifeFlightUnit || ""}
                    onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                    className="w-full px-3 py-2 rounded text-sm outline-none"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">Select unit</option>
                    {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {state.lifeFlight.lifeFlightUnit === "Other" && (
                    <TextField
                      className="mt-2"
                      value={state.lifeFlight.lifeFlightUnitOther}
                      onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                      placeholder="Specify"
                    />
                  )}
                </div>
              </Section>
              </div>

              </div>

              <div className="flex flex-col gap-4">
              <Section title="Follow-Up">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Incident Type
                </label>
                <div className="mb-1.5">
                  {["MVA", "Medical", "Trauma"].map((o) => (
                    <Pill key={o} active={state.lifeFlight.problem === o} onClick={() => setLifeFlightField("problem", o, `Life Flight Problem: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>
                {state.lifeFlight.problem === "MVA" && (
                  <div className="mb-1.5">
                    <Pill active={state.lifeFlight.mvaEntrapment != null} onClick={() => toggleLifeFlightField("mvaEntrapment", "Entrapment")} color={theme.red}>
                      Entrapment
                    </Pill>
                    <Pill active={state.lifeFlight.mvaEjection != null} onClick={() => toggleLifeFlightField("mvaEjection", "Ejection")} color={theme.red}>
                      Ejection
                    </Pill>
                  </div>
                )}
                {(state.lifeFlight.problem === "Medical" || state.lifeFlight.problem === "Trauma") && (
                  <TextField
                    className="mb-1.5"
                    value={state.lifeFlight.problemOther}
                    onChange={(v) => setLifeFlightField("problemOther", v)}
                    placeholder="Problem Description"
                  />
                )}
                <div className="mt-2">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Number of Patients
                  </label>
                  <select
                    value={state.lifeFlight.numberOfPatients || ""}
                    onChange={(e) => setLifeFlightField("numberOfPatients", e.target.value, `Number of Patients: ${e.target.value}`)}
                    className="px-3 py-2 rounded text-sm outline-none w-28"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">—</option>
                    {["1", "2", "3", "4", "Other"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {state.lifeFlight.numberOfPatients === "Other" && (
                    <TextField className="mt-2 w-28" value={state.lifeFlight.numberOfPatientsOther} onChange={(v) => setLifeFlightField("numberOfPatientsOther", v)} placeholder="Specify" />
                  )}
                </div>
              </Section>

              {Array.from({ length: patientCount }).map((_, i) => {
                const patient = state.lifeFlight.patients[i] || defaultPatient();
                return (
                  <Section key={i} title={patientCount > 1 ? `Patient ${i + 1}` : "Patient Information"}>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <TextField label="Age" value={patient.age} onChange={(v) => setPatientField(i, "age", v)} placeholder="Age" />
                      <div>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Sex
                        </label>
                        {["Male", "Female"].map((o) => (
                          <Pill key={o} active={patient.sex === o} onClick={() => setPatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`)}>
                            {o}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Weight
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <TextField value={patient.weightKg} onChange={(v) => handlePatientWeightChange(i, "kg", v)} placeholder="kgs" />
                        <TextField value={patient.weightLbs} onChange={(v) => handlePatientWeightChange(i, "lbs", v)} placeholder="lbs" />
                      </div>
                    </div>

                    <TextField
                      label="Problem Description"
                      value={patient.problemDescription}
                      onChange={(v) => setPatientField(i, "problemDescription", v)}
                      placeholder="Problem Description"
                      className="mb-3"
                    />

                    <div>
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Interventions
                      </label>
                      {PATIENT_INTERVENTION_ITEMS.map((it) => (
                        <CheckRow
                          key={it.key}
                          label={it.label}
                          value={patient.interventions[it.key]}
                          onToggle={() => togglePatientIntervention(i, it.key, it.label)}
                        />
                      ))}
                      {patient.interventions.other != null && (
                        <TextField
                          className="mt-1"
                          value={patient.interventionOther}
                          onChange={(v) => setPatientField(i, "interventionOther", v)}
                          placeholder="Intervention"
                        />
                      )}
                    </div>
                  </Section>
                );
              })}

              </div>
            </div>

            <GroupHeader>Units & Assignments</GroupHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { key: "suppressionUnits", title: "Suppression", unitOptions: UNIT_OPTIONS, assignOptions: SUPPRESSION_ASSIGNMENT_OPTIONS },
                { key: "emsUnits", title: "EMS", unitOptions: MEDIC_UNIT_OPTIONS, assignOptions: EMS_ASSIGNMENT_OPTIONS },
              ].map(({ key, title, unitOptions, assignOptions }) => (
                <Section key={key} title={title}>
                  <div className="flex flex-col gap-2">
                    {state.lifeFlight[key].map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 rounded" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <select
                          value={u.unit}
                          onChange={(e) => updateLifeFlightUnit(key, u.id, "unit", e.target.value)}
                          className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                        >
                          <option value="">Unit</option>
                          {unitOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <select
                          value={u.assign}
                          onChange={(e) => updateLifeFlightUnit(key, u.id, "assign", e.target.value)}
                          className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        >
                          <option value="">Assignment</option>
                          {assignOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => removeLifeFlightUnit(key, u.id)} style={{ color: theme.textDim }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addLifeFlightUnit(key)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>
                </Section>
              ))}
            </div>

            <GroupHeader>Tactical Objectives</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Landing Zone">
                <TextField
                  className="mb-3"
                  value={state.lifeFlight.landingZoneLocation}
                  onChange={(v) => setLifeFlightField("landingZoneLocation", v)}
                  placeholder="Landing Zone Location"
                />
                {LZ_SURFACE_ITEMS.map((it) => (
                  <CheckRow
                    key={it.key}
                    label={it.label}
                    value={state.lifeFlight.surface[it.key]}
                    onToggle={() => toggleLifeFlightNested("surface", it.key, it.label)}
                  />
                ))}
                {LZ_LIGHTING_ITEMS.map((it) => (
                  <CheckRow
                    key={it.key}
                    label={it.label}
                    value={state.lifeFlight.lighting[it.key]}
                    onToggle={() => toggleLifeFlightNested("lighting", it.key, it.label)}
                  />
                ))}
                <div className="mt-3 mb-2">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Wind Direction
                  </label>
                  {WIND_DIRECTION_OPTIONS.map((o) => (
                    <Pill key={o} active={state.lifeFlight.windDirection === o} onClick={() => setLifeFlightField("windDirection", o, `Wind Direction: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>
                <TextField label="Wind Speed" value={state.lifeFlight.windSpeed} onChange={(v) => setLifeFlightField("windSpeed", v)} placeholder="mph" />
              </Section>

              <Section title="Safety">
                {LZ_HAZARDS_ITEMS.map((it) => (
                  <CheckRow
                    key={it.key}
                    label={it.label}
                    value={state.lifeFlight.hazards[it.key]}
                    onToggle={() => toggleLifeFlightNested("hazards", it.key, it.label)}
                  />
                ))}
              </Section>

            </div>

            <GroupHeader>Support</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Mutual Aid">
                <CheckRow label="Fire" value={state.lifeFlight.mutualAid.fire} onToggle={() => toggleLifeFlightNested("mutualAid", "fire", "Fire")} />
                {state.lifeFlight.mutualAid.fire != null && (
                  <select
                    value={state.lifeFlight.mutualAid.fireDept}
                    onChange={(e) => setLifeFlightMutualAidField("fireDept", e.target.value)}
                    className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">Select department</option>
                    {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                )}
                {LIFE_FLIGHT_MUTUAL_AID_ITEMS.filter((it) => it.key !== "fire").map((it) => (
                  <CheckRow
                    key={it.key}
                    label={it.label}
                    value={state.lifeFlight.mutualAid[it.key]}
                    onToggle={() => toggleLifeFlightNested("mutualAid", it.key, it.label)}
                  />
                ))}
              </Section>
            </div>
            </div>
          )}

          {tab === "mayday" && (
            <div className="flex flex-col gap-4">
              <GroupHeader>MAYDAY Checklist</GroupHeader>
              <Section title="1. Initial Actions">
                <CheckRow label="SEMS" value={state.mayday.sems} onToggle={() => toggleSimple("mayday", "sems", "Step 1: SEMS")} />
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                  <CheckRow
                    label="Unit in Alarm"
                    value={state.mayday.unitInAlarm}
                    onToggle={() => toggleSimple("mayday", "unitInAlarm", "Step 1: Unit in Alarm")}
                  />
                  <TextField value={state.mayday.unitInAlarmId} onChange={(v) => setMaydayField("unitInAlarmId", v)} placeholder="Unit ID" />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                  <CheckRow
                    label="Air Supply"
                    value={state.mayday.airSupplyStep1}
                    onToggle={() => toggleSimple("mayday", "airSupplyStep1", "Step 1: Air Supply")}
                  />
                  <TextField value={state.mayday.airSupplyStep1Value} onChange={(v) => setMaydayField("airSupplyStep1Value", v)} placeholder="Air Supply" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <CheckRow
                    label="Mobile Radio"
                    value={state.mayday.mobileRadio}
                    onToggle={() => toggleSimple("mayday", "mobileRadio", "Step 1: Mobile Radio")}
                  />
                  <TextField value={state.mayday.mobileRadioId} onChange={(v) => setMaydayField("mobileRadioId", v)} placeholder="Radio ID" />
                </div>
              </Section>

              <Section title="2. Transmit">
                <CheckRow
                  label={`"Command to all units, clear this channel for a Mayday. Unit calling a Mayday, go ahead with your CAN Report."`}
                  value={state.mayday.step2}
                  onToggle={() => toggleSimple("mayday", "step2", "Step 2: Transmit — clear channel for Mayday")}
                />
              </Section>

              <Section title="3. Listen & Document">
                <CheckRow
                  label="Listen & Document"
                  value={state.mayday.step3}
                  onToggle={() => toggleSimple("mayday", "step3", "Step 3: Listen & Document")}
                />

                <div className="mt-3 mb-1">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Who
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <TextField value={state.mayday.whoName} onChange={(v) => setMaydayField("whoName", v)} placeholder="Name" />
                    <TextField value={state.mayday.whoUnit} onChange={(v) => setMaydayField("whoUnit", v)} placeholder="Unit ID" />
                  </div>
                </div>

                <div className="mt-3 mb-1">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    What
                  </label>
                  <div className="flex flex-wrap">
                    {MAYDAY_WHAT_OPTIONS.map((o) => (
                      <Pill key={o} active={state.mayday.what === o} onClick={() => setMaydayField("what", o, `Mayday What: ${o}`)} color={theme.red}>
                        {o}
                      </Pill>
                    ))}
                  </div>
                  {state.mayday.what === "Other" && (
                    <TextField className="mt-2" value={state.mayday.whatOther} onChange={(v) => setMaydayField("whatOther", v)} placeholder="Specify" />
                  )}
                </div>

                <div className="mt-3 mb-1">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Where — Side
                  </label>
                  <div className="flex flex-wrap">
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.mayday.whereSide === o} onClick={() => setMaydayField("whereSide", o, `Mayday Side: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                  </div>
                </div>

                <div className="mt-3 mb-1">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Where — Division
                  </label>
                  <div className="flex flex-wrap">
                    {MAYDAY_DIVISION_OPTIONS.map((o) => (
                      <Pill key={o} active={state.mayday.whereDivision === o} onClick={() => setMaydayField("whereDivision", o, `Mayday Division: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                  </div>
                  {state.mayday.whereDivision === "Other" && (
                    <TextField className="mt-2" value={state.mayday.whereDivisionOther} onChange={(v) => setMaydayField("whereDivisionOther", v)} placeholder="Specify" />
                  )}
                </div>

                <TextField
                  label="Air Supply"
                  value={state.mayday.airSupply}
                  onChange={(v) => setMaydayField("airSupply", v)}
                  placeholder="Air Supply"
                  className="mt-3"
                />
              </Section>

              <Section title="4. Transmit">
                <CheckRow
                  label={`"NAME, I copy your Mayday. (Repeat Who, What, Where); RIT is being deployed, initiate your GRAB-LIVES procedure. Remain calm & control your breathing."`}
                  value={state.mayday.step4}
                  onToggle={() => toggleSimple("mayday", "step4", "Step 4: Transmit — copy Mayday / deploy RIT / GRAB-LIVES")}
                />
              </Section>

              <Section title="5. Deploy">
                <CheckRow
                  label="Deploy units to address the Mayday. (Help Order) — Continue to PUT THE FIRE OUT!"
                  value={state.mayday.step5}
                  onToggle={() => toggleSimple("mayday", "step5", "Step 5: Deploy units to address the Mayday")}
                />
                <div className="mt-2">
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    Rescue Group
                  </label>
                  <div className="flex flex-wrap">
                    {activeTacticalUnits.map((o) => (
                      <Pill key={o} active={state.mayday.rescueGroup.includes(o)} onClick={() => toggleRescueGroupUnit(o)}>
                        {o}
                      </Pill>
                    ))}
                    <Pill active={state.mayday.rescueGroup.includes("Other")} onClick={() => toggleRescueGroupUnit("Other")}>
                      Other
                    </Pill>
                  </div>
                  {state.mayday.rescueGroup.includes("Other") && (
                    <TextField className="mt-2" value={state.mayday.rescueGroupOther} onChange={(v) => setMaydayField("rescueGroupOther", v)} placeholder="Unit" />
                  )}
                </div>
              </Section>

              <Section title="6. Transmit">
                <CheckRow
                  label={`"Command to Dispatch, give me Emergency Traffic Tones and an additional alarm; we have an active Mayday event."`}
                  value={state.mayday.step6}
                  onToggle={() => toggleSimple("mayday", "step6", "Step 6: Transmit — Emergency Traffic Tones / additional alarm")}
                />
              </Section>

              <Section title="7. CAN Report">
                <CheckRow
                  label="Once Emergency Traffic Tones clear, provide a brief Mayday CAN Report"
                  value={state.mayday.step7}
                  onToggle={() => toggleSimple("mayday", "step7", "Step 7: Brief Mayday CAN Report")}
                />
              </Section>

              <Section title="8. Transmit">
                <CheckRow
                  label={`"Command to all units, we have a Mayday in progress, (Who, What, Where); maintain radio silence."`}
                  value={state.mayday.step8}
                  onToggle={() => toggleSimple("mayday", "step8", "Step 8: Transmit — Mayday in progress to all units")}
                />
              </Section>

              <Section title="9. Assign">
                <CheckRow
                  label="Assign additional company to RIT"
                  value={state.mayday.step9AdditionalRit}
                  onToggle={() => toggleSimple("mayday", "step9AdditionalRit", "Step 9: Assign additional company to RIT")}
                  disabled={!additionalRitAssigned}
                  hint="Requires two units assigned RIT on the Structure Fire tab"
                />
                <CheckRow
                  label="Assign additional Division Officer"
                  value={state.mayday.step9AdditionalDivisionOfficer}
                  onToggle={() => toggleSimple("mayday", "step9AdditionalDivisionOfficer", "Step 9: Assign additional Division Officer")}
                  disabled={!additionalDivisionAssigned}
                  hint="Requires two units assigned Division on the Structure Fire tab"
                />

                <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                  Rescue Group
                </div>
                {["IC", "Division", "Other"].map((o) => (
                  <Pill key={o} active={state.mayday.managerType === o} onClick={() => setMaydayField("managerType", o, `Rescue Group: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                {state.mayday.managerType === "Division" && (
                  <div className="mt-2">
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.mayday.managerDivision === o} onClick={() => setMaydayField("managerDivision", o, `Rescue Group Division: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                  </div>
                )}
                {state.mayday.managerType === "Other" && (
                  <TextField className="mt-2" value={state.mayday.managerOther} onChange={(v) => setMaydayField("managerOther", v)} placeholder="Unit" />
                )}

                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                  <CheckRow
                    label="Assign Level 2 Staging location for additional alarm units"
                    value={state.mayday.step9Level2Staging}
                    onToggle={() => toggleSimple("mayday", "step9Level2Staging", "Step 9: Assign Level 2 Staging location for additional alarm units")}
                  />
                  <TextField value={state.mayday.level2StagingLocation} onChange={(v) => setMaydayLevel2Staging(v)} placeholder="Location" />
                </div>
              </Section>

              <Section title="10. Clearing the Mayday">
                <CheckRow
                  label="Conduct a PAR prior to clearing the MAYDAY"
                  value={state.mayday.step10}
                  onToggle={() => toggleSimple("mayday", "step10", "Step 10: Conduct a PAR prior to clearing the MAYDAY")}
                  bold
                />
                <CheckRow
                  label={`Transmit: "Command to Dispatch, the Mayday firefighter has been extricated from the building and is currently in treatment with EMS. I have a PAR on all units. Discontinue the Mayday event at (Command Location). All units, resume normal radio traffic. We will remain in the Offensive/Defensive Strategy; I am holding the current assignment."`}
                  value={state.mayday.step10Transmit}
                  onToggle={() => toggleSimple("mayday", "step10Transmit", "Step 10: Transmit — discontinue Mayday event")}
                  bold
                />
              </Section>
            </div>
          )}

          {tab === "specialops" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {SPECIAL_OPS_SUBTABS.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSpecialOpsSubTab(st)}
                    className="px-3 py-1.5 rounded text-xs font-bold"
                    style={{
                      background: specialOpsSubTab === st ? theme.goldDim : theme.panelAlt,
                      border: `1px solid ${specialOpsSubTab === st ? theme.gold : theme.border}`,
                      color: specialOpsSubTab === st ? theme.gold : theme.textSecondary,
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {specialOpsSubTab === "Technical Rescue" && (
                <div className="flex flex-wrap gap-2">
                  {TECH_RESCUE_SUBTABS.map((st) => (
                    <button
                      key={st}
                      onClick={() => setTechRescueSubTab(st)}
                      className="px-3 py-1.5 rounded text-xs font-bold"
                      style={{
                        background: techRescueSubTab === st ? theme.blueDim : theme.panelAlt,
                        border: `1px solid ${techRescueSubTab === st ? theme.blue : theme.border}`,
                        color: techRescueSubTab === st ? theme.blue : theme.textSecondary,
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}

              {specialOpsSubTab === "HAZMAT" ? (
                <div className="flex flex-col gap-6">
                <GroupHeader>Size-Up & Command</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Section title="Command">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit
                    </label>
                    <select
                      value={state.command.unit || ""}
                      onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                    >
                      <option value="">—</option>
                      {COMMAND_UNIT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Command Post Location
                    </label>
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                        {o}
                      </Pill>
                    ))}

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Command Transfer
                    </div>
                    {COMMAND_TRANSFER_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                        {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                          <div className="mb-1.5 pl-1">
                            {["Investigative", "Offensive", "Defensive"].map((o) => (
                              <Pill
                                key={o}
                                active={state.strategyConfirmationMode === o}
                                onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                                color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                              >
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>

                  <Section title="Follow-Up">
                    <div className="mb-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Incident Type
                      </label>
                      <select
                        value={state.hazmat.incidentType || ""}
                        onChange={(e) => setHazmatField("incidentType", e.target.value, `HAZMAT Incident Type: ${e.target.value}`)}
                        className="w-full px-3 py-2 rounded text-sm outline-none"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["Acid", "Biological", "Flammable/Explosive", "Radiological", "Nuclear", "Solid", "Spill", "Vapor"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Emergency Response Guidebook
                    </label>
                    {HAZMAT_IRR_ACTIONS.map((it) => (
                      <CheckRow key={it.key} label={it.label} value={state.hazmat[it.key]} onToggle={() => toggleSimple("hazmat", it.key, it.label)} />
                    ))}
                    {HAZMAT_IRR_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.hazmat[it.key]}
                        onToggle={() => toggleSimple("hazmat", it.key, it.label)}
                        value={state.hazmat[it.key + "Value"]}
                        onChange={(v) => setHazmatField(it.key + "Value", v)}
                      />
                    ))}
                  </Section>

                  <Section title="Communications">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      TAC Channel
                    </label>
                    <select
                      value={state.lifeFlight.tacChannel || ""}
                      onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-1"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {TAC_CHANNEL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.lifeFlight.tacChannel === "Other" && (
                      <TextField className="mb-3" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                    )}

                    <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                      Life Flight Response
                    </label>
                    {["Yes", "No"].map((o) => (
                      <Pill
                        key={o}
                        active={state.hazmat.lifeFlightResponse === o}
                        onClick={() => setHazmatField("lifeFlightResponse", o, `HAZMAT Life Flight Response: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}

                    {state.hazmat.lifeFlightResponse === "Yes" && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Ground Contact Channel
                        </label>
                        {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                          <Pill
                            key={o}
                            active={state.lifeFlight.groundContactChannel === o}
                            onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lifeFlight.groundContactChannel === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lifeFlight.groundContactChannelOther}
                            onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                            placeholder="Specify"
                          />
                        )}

                        <div className="mt-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Life Flight Unit
                          </label>
                          <select
                            value={state.lifeFlight.lifeFlightUnit || ""}
                            onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                            className="w-full px-3 py-2 rounded text-sm outline-none"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select unit</option>
                            {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {state.lifeFlight.lifeFlightUnit === "Other" && (
                            <TextField
                              className="mt-2"
                              value={state.lifeFlight.lifeFlightUnitOther}
                              onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                              placeholder="Specify"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Section>

                  <Section title="Victim Profile">
                    <div className="mb-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Number of Patients
                      </label>
                      <select
                        value={state.hazmat.numberOfPatients || ""}
                        onChange={(e) => setHazmatField("numberOfPatients", e.target.value, `Number of Patients: ${e.target.value}`)}
                        className="px-3 py-2 rounded text-sm outline-none w-28"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["1", "2", "3", "4", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {state.hazmat.numberOfPatients === "Other" && (
                        <TextField className="mt-2 w-28" value={state.hazmat.numberOfPatientsOther} onChange={(v) => setHazmatField("numberOfPatientsOther", v)} placeholder="Specify" />
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Rescue or Recovery
                      </label>
                      {["Rescue", "Recovery"].map((o) => (
                        <Pill key={o} active={state.hazmat.rescueOrRecovery === o} onClick={() => setHazmatField("rescueOrRecovery", o, `Rescue or Recovery: ${o}`)}>
                          {o}
                        </Pill>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <TextField label="Age" value={state.hazmat.age} onChange={(v) => setHazmatField("age", v)} placeholder="Age" />
                      <div>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Sex
                        </label>
                        {["Male", "Female"].map((o) => (
                          <Pill key={o} active={state.hazmat.sex === o} onClick={() => setHazmatField("sex", o)}>
                            {o}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Weight
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <TextField value={state.hazmat.weightKg} onChange={(v) => handleHazmatWeightChange("kg", v)} placeholder="kgs" />
                        <TextField value={state.hazmat.weightLbs} onChange={(v) => handleHazmatWeightChange("lbs", v)} placeholder="lbs" />
                      </div>
                    </div>

                    <TextField
                      label="Problem Description"
                      value={state.hazmat.problemDescription}
                      onChange={(v) => setHazmatField("problemDescription", v)}
                      placeholder="Problem Description"
                    />
                  </Section>
                </div>

                <GroupHeader>Units & Assignments</GroupHeader>
                <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <Section title="Units">
                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      Suppression
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {state.hazmat.suppressionUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("hazmat", "suppressionUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("hazmat", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("hazmat", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("hazmat", "suppressionUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {HAZMAT_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("hazmat", "suppressionUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("hazmat", "suppressionUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("hazmat", "suppressionUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      EMS
                    </div>
                    <div className="flex flex-col gap-2">
                      {state.hazmat.emsUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("hazmat", "emsUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {MEDIC_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("hazmat", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("hazmat", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("hazmat", "emsUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {HAZMAT_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("hazmat", "emsUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("hazmat", "emsUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("hazmat", "emsUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>
                  </Section>
                </div>
                </div>

                <GroupHeader>Tactical Objectives</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Section title="Benchmarks">
                    <CheckRow
                      label="Contact HCFMO / Harris County HAZMAT"
                      value={state.hazmat.benchmarks.contactOsha}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "contactOsha", "Contact HCFMO / Harris County HAZMAT")}
                    />

                    <AutoCheckRow label="Assign Investigating Unit" unit={hazmatDerived.allUnits.find((u) => u.assign === "Investigating")} />
                    <AutoCheckRow label="Assign Rescue Group" unit={hazmatDerived.rescueGroupUnit} />
                    <AutoCheckRow label="Assign Rescue Unit" unit={hazmatDerived.rescueUnitUnit} />
                    <AutoCheckRow label="Assign Safety" unit={hazmatDerived.safetyUnit} />
                    <AutoCheckRow label="Assign RIT" unit={hazmatDerived.ritUnit} />
                    <AutoCheckRow label="Assign Medical Group" unit={hazmatDerived.medicalGroupUnit} />
                    <AutoCheckRow label="Assign Medical Unit" unit={hazmatDerived.medicalUnitUnit} />
                    <AutoCheckRow label="Assign Decon Group" unit={hazmatDerived.deconGroupUnit} />
                    <AutoCheckRow label="Assign Rehab Group" unit={hazmatDerived.rehabUnit} />

                    <CheckRow
                      label="Establish Zones"
                      value={state.hazmat.benchmarks.establishZones}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "establishZones", "Establish Zones")}
                    />
                    <CheckRow
                      label="Evacuation / SIP Protocol"
                      value={state.hazmat.benchmarks.evacuationSipProtocol}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "evacuationSipProtocol", "Evacuation / SIP Protocol")}
                    />
                    <CheckRow
                      label="Identify Immediate Hazards"
                      value={state.hazmat.benchmarks.identifyHazards}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                    />
                    {HAZMAT_BENCHMARKS_LOGISTICS_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.key === "rescuerPpe" ? "PPE" : it.label}
                        value={state.hazmat.logistics[it.key]}
                        onToggle={() => toggleTechRescueNested("hazmat", "logistics", it.key, it.label)}
                      />
                    ))}
                    <CheckRow
                      label="Rescue / Recovery"
                      value={state.hazmat.benchmarks.rescueRecovery}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "rescueRecovery", "Rescue / Recovery")}
                    />
                    <CheckRow
                      label="PAR"
                      value={state.hazmat.benchmarks.pars}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "pars", "PAR")}
                    />
                    <CheckRow
                      label="After Action Review"
                      value={state.hazmat.benchmarks.afterActionReview}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "afterActionReview", "After Action Review")}
                    />
                    <CheckRow
                      label="Termination"
                      value={state.hazmat.benchmarks.termination}
                      onToggle={() => toggleTechRescueNested("hazmat", "benchmarks", "termination", "Termination")}
                    />
                  </Section>

                  <div className="flex flex-col gap-4">
                  <Section title="Air Monitoring">
                    {HAZMAT_AIR_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.hazmat[it.key]}
                        onToggle={() => toggleSimple("hazmat", it.key, it.label)}
                        value={state.hazmat[it.key + "Value"]}
                        onChange={(v) => setHazmatField(it.key + "Value", v)}
                      />
                    ))}
                    <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                        SCBA Required
                      </div>
                      <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                        {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                          <li key={t} className="mb-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section title="Material Specifics">
                    {HAZMAT_MATERIAL_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.hazmat[it.key]}
                        onToggle={() => toggleSimple("hazmat", it.key, it.label)}
                        value={state.hazmat[it.key + "Value"]}
                        onChange={(v) => setHazmatField(it.key + "Value", v)}
                      />
                    ))}
                    {HAZMAT_MATERIAL_FIELDS_2.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.hazmat[it.key]}
                        onToggle={() => toggleSimple("hazmat", it.key, it.label)}
                        value={state.hazmat[it.key + "Value"]}
                        onChange={(v) => setHazmatField(it.key + "Value", v)}
                      />
                    ))}
                  </Section>
                  </div>
                </div>

                <GroupHeader>Support</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="References">
                    <div className="text-sm flex flex-col gap-3" style={{ color: theme.textPrimary }}>
                      <div>
                        <div className="font-bold mb-1">Sink / Float</div>
                        <div>Molecular weight of Water is 18</div>
                        <div>Molecular weight of Air is 29</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Initial Isolation Distances</div>
                        <div>Solid: 75'</div>
                        <div>Liquid: 150'</div>
                        <div>Gas: 300'</div>
                        <div>Explosive: Double</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Time Permitted in IDLH</div>
                        <div>Deceased Victims: 3 minutes</div>
                        <div>Viable Victims: 30 minutes</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Wait for HAZMAT if</div>
                        <div>O2 &lt;19.5%</div>
                        <div>O2 &gt;23%</div>
                        <div>LEL &gt;10% (Ventilate)</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Explosives</div>
                        <div>ERG 112, 113, 114</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Radioactive</div>
                        <div>ERG 161, 162, 163, 164, 165, 166</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Corrosive Gases</div>
                        <div>ERG 118, 123, 124, 125</div>
                      </div>
                      <div>
                        <div className="font-bold mb-1">Polymerization</div>
                        <div>ERG P</div>
                      </div>
                    </div>
                  </Section>

                  <Section title="Mutual Aid">
                    {HAZMAT_MUTUAL_AID_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.hazmat.mutualAid[it.key]} onToggle={() => toggleHazmatMutualAid(it.key, it.label)} />
                        {it.key === "fire" && state.hazmat.mutualAid.fire != null && (
                          <select
                            value={state.hazmat.mutualAid.fireDept}
                            onChange={(e) => setHazmatMutualAidField("fireDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                        {it.key === "hazmat" && state.hazmat.mutualAid.hazmat != null && (
                          <select
                            value={state.hazmat.mutualAid.hazmatDept}
                            onChange={(e) => setHazmatMutualAidField("hazmatDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>
                </div>
                </div>
              ) : specialOpsSubTab === "Technical Rescue" && techRescueSubTab === "Rope Rescue" ? (
                <div className="flex flex-col gap-6">
                <GroupHeader>Size-Up & Command</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="Command">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit
                    </label>
                    <select
                      value={state.command.unit || ""}
                      onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                    >
                      <option value="">—</option>
                      {COMMAND_UNIT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Command Post Location
                    </label>
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                        {o}
                      </Pill>
                    ))}

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Command Transfer
                    </div>
                    {ROPE_RESCUE_COMMAND_TRANSFER_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                        {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                          <div className="mb-1.5 pl-1">
                            {["Investigative", "Offensive", "Defensive"].map((o) => (
                              <Pill
                                key={o}
                                active={state.strategyConfirmationMode === o}
                                onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                                color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                              >
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>

                  <Section title="Follow-Up">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Incident Type
                    </label>
                    <select
                      value={state.ropeRescue.followUp.incidentType || ""}
                      onChange={(e) => setTechRescueNestedField("ropeRescue", "followUp", "incidentType", e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {["Low Angle", "High Angle"].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <div className="mt-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Number of Patients
                      </label>
                      <select
                        value={state.ropeRescue.numberOfPatients || ""}
                        onChange={(e) => setTechRescueField("ropeRescue", "numberOfPatients", e.target.value, `Rope Rescue Number of Patients: ${e.target.value}`)}
                        className="px-3 py-2 rounded text-sm outline-none w-28"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["1", "2", "3", "4", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {state.ropeRescue.numberOfPatients === "Other" && (
                        <TextField
                          className="mt-2 w-28"
                          value={state.ropeRescue.numberOfPatientsOther}
                          onChange={(v) => setTechRescueField("ropeRescue", "numberOfPatientsOther", v)}
                          placeholder="Specify"
                        />
                      )}
                    </div>
                  </Section>

                  <Section title="Communications">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      TAC Channel
                    </label>
                    <select
                      value={state.lifeFlight.tacChannel || ""}
                      onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-1"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {TAC_CHANNEL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.lifeFlight.tacChannel === "Other" && (
                      <TextField className="mb-3" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                    )}

                    <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                      Life Flight Response
                    </label>
                    {["Yes", "No"].map((o) => (
                      <Pill
                        key={o}
                        active={state.ropeRescue.lifeFlightResponse === o}
                        onClick={() => setTechRescueField("ropeRescue", "lifeFlightResponse", o, `Confined Space Life Flight Response: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}

                    {state.ropeRescue.lifeFlightResponse === "Yes" && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Ground Contact Channel
                        </label>
                        {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                          <Pill
                            key={o}
                            active={state.lifeFlight.groundContactChannel === o}
                            onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lifeFlight.groundContactChannel === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lifeFlight.groundContactChannelOther}
                            onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                            placeholder="Specify"
                          />
                        )}

                        <div className="mt-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Life Flight Unit
                          </label>
                          <select
                            value={state.lifeFlight.lifeFlightUnit || ""}
                            onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                            className="w-full px-3 py-2 rounded text-sm outline-none"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select unit</option>
                            {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {state.lifeFlight.lifeFlightUnit === "Other" && (
                            <TextField
                              className="mt-2"
                              value={state.lifeFlight.lifeFlightUnitOther}
                              onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                              placeholder="Specify"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Section>

                  {Array.from({ length: ropePatientCount }).map((_, i) => {
                    const patient = state.ropeRescue.patients[i] || defaultRopePatient();
                    return (
                      <Section key={i} title={ropePatientCount > 1 ? `Patient ${i + 1}` : "Patient Information"}>
                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Rescue or Recovery
                          </label>
                          {["Rescue", "Recovery"].map((o) => (
                            <Pill key={o} active={patient.rescueOrRecovery === o} onClick={() => setRopePatientField(i, "rescueOrRecovery", o)}>
                              {o}
                            </Pill>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <TextField label="Age" value={patient.age} onChange={(v) => setRopePatientField(i, "age", v)} placeholder="Age" />
                          <div>
                            <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Sex
                            </label>
                            {["Male", "Female"].map((o) => (
                              <Pill key={o} active={patient.sex === o} onClick={() => setRopePatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Weight
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <TextField value={patient.weightKg} onChange={(v) => handleRopePatientWeightChange(i, "kg", v)} placeholder="kgs" />
                            <TextField value={patient.weightLbs} onChange={(v) => handleRopePatientWeightChange(i, "lbs", v)} placeholder="lbs" />
                          </div>
                        </div>

                        <TextField
                          label="Problem Description"
                          value={patient.problemDescription}
                          onChange={(v) => setRopePatientField(i, "problemDescription", v)}
                          placeholder="Problem Description"
                        />
                      </Section>
                    );
                  })}
                </div>

                <GroupHeader>Units & Assignments</GroupHeader>
                <div className="grid grid-cols-1 gap-4">
                  <Section title="Units">
                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      Suppression
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {state.ropeRescue.suppressionUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("ropeRescue", "suppressionUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("ropeRescue", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("ropeRescue", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("ropeRescue", "suppressionUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {ROPE_RESCUE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("ropeRescue", "suppressionUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("ropeRescue", "suppressionUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("ropeRescue", "suppressionUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      EMS
                    </div>
                    <div className="flex flex-col gap-2">
                      {state.ropeRescue.emsUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("ropeRescue", "emsUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {MEDIC_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("ropeRescue", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("ropeRescue", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("ropeRescue", "emsUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {ROPE_RESCUE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("ropeRescue", "emsUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("ropeRescue", "emsUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("ropeRescue", "emsUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>
                  </Section>
                </div>

                <GroupHeader>Tactical Objectives</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Section title="Benchmarks">
                    <AutoCheckRow label="Assign Rescue Group" unit={ropeRescueRescueGroupUnit} />
                    <AutoCheckRow label="Assign Rescue Unit" unit={ropeRescueRescueUnitUnit} />
                    <AutoCheckRow label="Assign Roof Sector" unit={ropeRescueRoofSectorUnit} />
                    <AutoCheckRow label="Assign Turntable" unit={ropeRescueTurntableUnit} />
                    <AutoCheckRow label="Assign Landing Zone" unit={ropeRescueLandingZoneUnit} />
                    <AutoCheckRow label="Assign Safety" unit={ropeRescueSafetyUnit} />
                    <AutoCheckRow label="Assign Medical Group" unit={ropeRescueMedicalGroupUnit} />
                    <AutoCheckRow label="Assign Medical Unit" unit={ropeRescueMedicalUnitUnit} />
                    <AutoCheckRow label="Assign Rehab Group" unit={ropeRescueRehabUnit} />

                    <CheckRow
                      label="Establish Zones"
                      value={state.ropeRescue.benchmarks.establishZones}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "establishZones", "Establish Zones")}
                    />
                    <CheckRow
                      label="Identify Immediate Hazards"
                      value={state.ropeRescue.benchmarks.identifyHazards}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                    />
                    {CONFINED_SPACE_LOGISTICS_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.key === "rescuerPpe" ? "PPE" : it.label}
                        value={state.ropeRescue.logistics[it.key]}
                        onToggle={() => toggleTechRescueNested("ropeRescue", "logistics", it.key, it.label)}
                      />
                    ))}
                    <CheckRow
                      label="Rescue / Recovery"
                      value={state.ropeRescue.benchmarks.rescueRecovery}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "rescueRecovery", "Rescue / Recovery")}
                    />
                    <CheckRow
                      label="PAR"
                      value={state.ropeRescue.benchmarks.pars}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "pars", "PAR")}
                    />
                    <CheckRow
                      label="Contact OSHA"
                      value={state.ropeRescue.benchmarks.contactOsha}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "contactOsha", "Contact OSHA")}
                    />
                    <CheckRow
                      label="After Action Review"
                      value={state.ropeRescue.benchmarks.afterActionReview}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "afterActionReview", "After Action Review")}
                    />
                    <CheckRow
                      label="Termination"
                      value={state.ropeRescue.benchmarks.termination}
                      onToggle={() => toggleTechRescueNested("ropeRescue", "benchmarks", "termination", "Termination")}
                    />
                  </Section>

                  <div className="flex flex-col gap-4">
                  <Section title="Rescue / Recovery">
                    {ROPE_RESCUE_RECOVERY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.ropeRescue.rescueRecoveryBox[it.key]}
                        onToggle={() => toggleTechRescueNested("ropeRescue", "rescueRecoveryBox", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <Section title="Incident Termination">
                    {INCIDENT_TERMINATION_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.ropeRescue.incidentTermination[it.key]}
                        onToggle={() => toggleTechRescueNested("ropeRescue", "incidentTermination", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <div className="flex-1">
                  <CollapsibleSection title="Air Monitoring" fill>
                    {HAZMAT_AIR_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.ropeRescue.airMonitoring[it.key]}
                        onToggle={() => toggleTechRescueNested("ropeRescue", "airMonitoring", it.key, it.label)}
                        value={state.ropeRescue.airMonitoring[it.key + "Value"]}
                        onChange={(v) => setTechRescueNestedField("ropeRescue", "airMonitoring", it.key + "Value", v)}
                      />
                    ))}
                    <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                        SCBA Required
                      </div>
                      <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                        {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                          <li key={t} className="mb-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleSection>
                  </div>
                  </div>
                </div>

                <GroupHeader>Support</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <CollapsibleSection title="Mutual Aid">
                    {HAZMAT_MUTUAL_AID_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow
                          label={it.label}
                          value={state.ropeRescue.mutualAid[it.key]}
                          onToggle={() => toggleTechRescueMutualAid("ropeRescue", it.key, it.label)}
                        />
                        {it.key === "fire" && state.ropeRescue.mutualAid.fire != null && (
                          <select
                            value={state.ropeRescue.mutualAid.fireDept}
                            onChange={(e) => setTechRescueMutualAidField("ropeRescue", "fireDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                        {it.key === "hazmat" && state.ropeRescue.mutualAid.hazmat != null && (
                          <select
                            value={state.ropeRescue.mutualAid.hazmatDept}
                            onChange={(e) => setTechRescueMutualAidField("ropeRescue", "hazmatDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    ))}
                  </CollapsibleSection>
                </div>
                </div>
              ) : specialOpsSubTab === "Technical Rescue" && techRescueSubTab === "Trench Rescue" ? (
                <div className="flex flex-col gap-6">
                <GroupHeader>Size-Up & Command</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="Command">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit
                    </label>
                    <select
                      value={state.command.unit || ""}
                      onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                    >
                      <option value="">—</option>
                      {COMMAND_UNIT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Command Post Location
                    </label>
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                        {o}
                      </Pill>
                    ))}

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Command Transfer
                    </div>
                    {COMMAND_TRANSFER_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                        {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                          <div className="mb-1.5 pl-1">
                            {["Investigative", "Offensive", "Defensive"].map((o) => (
                              <Pill
                                key={o}
                                active={state.strategyConfirmationMode === o}
                                onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                                color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                              >
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>

                  <Section title="Follow-Up">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Incident Type
                    </label>
                    <select
                      value={state.trenchRescue.followUp.incidentType || ""}
                      onChange={(e) => setTechRescueNestedField("trenchRescue", "followUp", "incidentType", e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {["Lip-In", "Shear-In", "Slough-In", "Spoil-In", "Shoring Failure", "Other"].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.trenchRescue.followUp.incidentType === "Other" && (
                      <TextField
                        className="mt-2"
                        value={state.trenchRescue.followUp.incidentTypeOther}
                        onChange={(v) => setTechRescueNestedField("trenchRescue", "followUp", "incidentTypeOther", v)}
                        placeholder="Specify"
                      />
                    )}

                    <div className="mt-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Number of Patients
                      </label>
                      <select
                        value={state.trenchRescue.numberOfPatients || ""}
                        onChange={(e) => setTechRescueField("trenchRescue", "numberOfPatients", e.target.value, `Trench Rescue Number of Patients: ${e.target.value}`)}
                        className="px-3 py-2 rounded text-sm outline-none w-28"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["1", "2", "3", "4", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {state.trenchRescue.numberOfPatients === "Other" && (
                        <TextField
                          className="mt-2 w-28"
                          value={state.trenchRescue.numberOfPatientsOther}
                          onChange={(v) => setTechRescueField("trenchRescue", "numberOfPatientsOther", v)}
                          placeholder="Specify"
                        />
                      )}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Trench Hazards
                    </div>
                    {hazardsOpenMap.trenchRescue ? (
                      <select
                        multiple
                        autoFocus
                        value={state.trenchRescue.followUp.trenchHazards}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                          setTechRescueNestedField("trenchRescue", "followUp", "trenchHazards", selected);
                        }}
                        onBlur={() => setHazardsOpenMap((m) => ({ ...m, trenchRescue: false }))}
                        size={5}
                        className="w-full px-3 py-2 rounded text-sm outline-none"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        {["Hazmat", "Soil Conditions", "Vibration", "Water", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setHazardsOpenMap((m) => ({ ...m, trenchRescue: true }))}
                        className="w-full px-3 py-2 rounded text-sm text-left outline-none"
                        style={{
                          background: theme.panelAlt,
                          border: `1px solid ${theme.border}`,
                          color: state.trenchRescue.followUp.trenchHazards.length ? theme.textPrimary : theme.textDim,
                        }}
                      >
                        {state.trenchRescue.followUp.trenchHazards.length ? state.trenchRescue.followUp.trenchHazards.join(", ") : "—"}
                      </button>
                    )}
                    {state.trenchRescue.followUp.trenchHazards.includes("Other") && (
                      <TextField
                        className="mt-2"
                        value={state.trenchRescue.followUp.trenchHazardsOther}
                        onChange={(v) => setTechRescueNestedField("trenchRescue", "followUp", "trenchHazardsOther", v)}
                        placeholder="Specify"
                      />
                    )}
                  </Section>

                  <Section title="Communications">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      TAC Channel
                    </label>
                    <select
                      value={state.lifeFlight.tacChannel || ""}
                      onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-1"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {TAC_CHANNEL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.lifeFlight.tacChannel === "Other" && (
                      <TextField className="mb-3" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                    )}

                    <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                      Life Flight Response
                    </label>
                    {["Yes", "No"].map((o) => (
                      <Pill
                        key={o}
                        active={state.trenchRescue.lifeFlightResponse === o}
                        onClick={() => setTechRescueField("trenchRescue", "lifeFlightResponse", o, `Trench Rescue Life Flight Response: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}

                    {state.trenchRescue.lifeFlightResponse === "Yes" && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Ground Contact Channel
                        </label>
                        {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                          <Pill
                            key={o}
                            active={state.lifeFlight.groundContactChannel === o}
                            onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lifeFlight.groundContactChannel === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lifeFlight.groundContactChannelOther}
                            onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                            placeholder="Specify"
                          />
                        )}

                        <div className="mt-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Life Flight Unit
                          </label>
                          <select
                            value={state.lifeFlight.lifeFlightUnit || ""}
                            onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                            className="w-full px-3 py-2 rounded text-sm outline-none"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select unit</option>
                            {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {state.lifeFlight.lifeFlightUnit === "Other" && (
                            <TextField
                              className="mt-2"
                              value={state.lifeFlight.lifeFlightUnitOther}
                              onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                              placeholder="Specify"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Section>

                  {Array.from({ length: trenchPatientCount }).map((_, i) => {
                    const patient = state.trenchRescue.patients[i] || defaultTrenchPatient();
                    return (
                      <Section key={i} title={trenchPatientCount > 1 ? `Patient ${i + 1}` : "Patient Information"}>
                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Rescue or Recovery
                          </label>
                          {["Rescue", "Recovery"].map((o) => (
                            <Pill key={o} active={patient.rescueOrRecovery === o} onClick={() => setTrenchPatientField(i, "rescueOrRecovery", o)}>
                              {o}
                            </Pill>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <TextField label="Age" value={patient.age} onChange={(v) => setTrenchPatientField(i, "age", v)} placeholder="Age" />
                          <div>
                            <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Sex
                            </label>
                            {["Male", "Female"].map((o) => (
                              <Pill key={o} active={patient.sex === o} onClick={() => setTrenchPatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Weight
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <TextField value={patient.weightKg} onChange={(v) => handleTrenchPatientWeightChange(i, "kg", v)} placeholder="kgs" />
                            <TextField value={patient.weightLbs} onChange={(v) => handleTrenchPatientWeightChange(i, "lbs", v)} placeholder="lbs" />
                          </div>
                        </div>

                        <TextField
                          label="Problem Description"
                          value={patient.problemDescription}
                          onChange={(v) => setTrenchPatientField(i, "problemDescription", v)}
                          placeholder="Problem Description"
                        />
                      </Section>
                    );
                  })}
                </div>

                <GroupHeader>Units & Assignments</GroupHeader>
                <div className="grid grid-cols-1 gap-4">
                  <Section title="Units">
                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      Suppression
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {state.trenchRescue.suppressionUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("trenchRescue", "suppressionUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("trenchRescue", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("trenchRescue", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("trenchRescue", "suppressionUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {CONFINED_SPACE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("trenchRescue", "suppressionUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("trenchRescue", "suppressionUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("trenchRescue", "suppressionUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      EMS
                    </div>
                    <div className="flex flex-col gap-2">
                      {state.trenchRescue.emsUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("trenchRescue", "emsUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {MEDIC_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("trenchRescue", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("trenchRescue", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("trenchRescue", "emsUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {CONFINED_SPACE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("trenchRescue", "emsUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("trenchRescue", "emsUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("trenchRescue", "emsUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>
                  </Section>
                </div>

                <GroupHeader>Tactical Objectives</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-4">
                  <Section title="Benchmarks">
                    <AutoCheckRow label="Assign Rescue Group" unit={trenchRescueDerived.rescueGroupUnit} />
                    <AutoCheckRow label="Assign Rescue Unit" unit={trenchRescueDerived.rescueUnitUnit} />
                    <AutoCheckRow label="Assign Safety" unit={trenchRescueDerived.safetyUnit} />
                    <AutoCheckRow label="Assign RIT" unit={trenchRescueDerived.ritUnit} />
                    <AutoCheckRow label="Assign Medical Group" unit={trenchRescueDerived.medicalGroupUnit} />
                    <AutoCheckRow label="Assign Medical Unit" unit={trenchRescueDerived.medicalUnitUnit} />
                    <AutoCheckRow label="Assign Decon Group" unit={trenchRescueDerived.deconGroupUnit} />
                    <AutoCheckRow label="Assign Rehab Group" unit={trenchRescueDerived.rehabUnit} />

                    <CheckRow
                      label="Establish Zones"
                      value={state.trenchRescue.benchmarks.establishZones}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "establishZones", "Establish Zones")}
                    />
                    <CheckRow
                      label="Identify Immediate Hazards"
                      value={state.trenchRescue.benchmarks.identifyHazards}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                    />
                    {CONFINED_SPACE_LOGISTICS_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.key === "rescuerPpe" ? "PPE" : it.label}
                        value={state.trenchRescue.logistics[it.key]}
                        onToggle={() => toggleTechRescueNested("trenchRescue", "logistics", it.key, it.label)}
                      />
                    ))}
                    <CheckRow
                      label="Rescue / Recovery"
                      value={state.trenchRescue.benchmarks.rescueRecovery}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "rescueRecovery", "Rescue / Recovery")}
                    />
                    <CheckRow
                      label="PAR"
                      value={state.trenchRescue.benchmarks.pars}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "pars", "PAR")}
                    />
                    <CheckRow
                      label="Contact OSHA"
                      value={state.trenchRescue.benchmarks.contactOsha}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "contactOsha", "Contact OSHA")}
                    />
                    <CheckRow
                      label="After Action Review"
                      value={state.trenchRescue.benchmarks.afterActionReview}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "afterActionReview", "After Action Review")}
                    />
                    <CheckRow
                      label="Termination"
                      value={state.trenchRescue.benchmarks.termination}
                      onToggle={() => toggleTechRescueNested("trenchRescue", "benchmarks", "termination", "Termination")}
                    />
                  </Section>

                  <Section title="Incident Termination">
                    {INCIDENT_TERMINATION_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.trenchRescue.incidentTermination[it.key]}
                        onToggle={() => toggleTechRescueNested("trenchRescue", "incidentTermination", it.key, it.label)}
                      />
                    ))}
                  </Section>
                  </div>

                  <div className="flex flex-col gap-4">
                  <Section title="Pre-Entry">
                    {PRE_ENTRY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.trenchRescue.preEntry[it.key]}
                        onToggle={() => toggleTechRescueNested("trenchRescue", "preEntry", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <Section title="Air Monitoring">
                    {HAZMAT_AIR_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.trenchRescue.airMonitoring[it.key]}
                        onToggle={() => toggleTechRescueNested("trenchRescue", "airMonitoring", it.key, it.label)}
                        value={state.trenchRescue.airMonitoring[it.key + "Value"]}
                        onChange={(v) => setTechRescueNestedField("trenchRescue", "airMonitoring", it.key + "Value", v)}
                      />
                    ))}
                    <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                        SCBA Required
                      </div>
                      <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                        {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                          <li key={t} className="mb-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section title="Rescue / Recovery">
                    {RESCUE_RECOVERY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.trenchRescue.rescueRecovery[it.key]}
                        onToggle={() => toggleTechRescueNested("trenchRescue", "rescueRecovery", it.key, it.label)}
                      />
                    ))}
                  </Section>
                  </div>
                </div>

                <GroupHeader>Support</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <CollapsibleSection title="Mutual Aid">
                    {HAZMAT_MUTUAL_AID_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow
                          label={it.label}
                          value={state.trenchRescue.mutualAid[it.key]}
                          onToggle={() => toggleTechRescueMutualAid("trenchRescue", it.key, it.label)}
                        />
                        {it.key === "fire" && state.trenchRescue.mutualAid.fire != null && (
                          <select
                            value={state.trenchRescue.mutualAid.fireDept}
                            onChange={(e) => setTechRescueMutualAidField("trenchRescue", "fireDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                        {it.key === "hazmat" && state.trenchRescue.mutualAid.hazmat != null && (
                          <select
                            value={state.trenchRescue.mutualAid.hazmatDept}
                            onChange={(e) => setTechRescueMutualAidField("trenchRescue", "hazmatDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    ))}
                    <CheckRow
                      label="OSHA"
                      value={state.trenchRescue.mutualAid.osha}
                      onToggle={() => toggleTechRescueMutualAid("trenchRescue", "osha", "OSHA")}
                    />
                  </CollapsibleSection>
                </div>
                </div>
              ) : specialOpsSubTab === "Technical Rescue" && techRescueSubTab === "Confined Space" ? (
                <div className="flex flex-col gap-6">
                <GroupHeader>Size-Up & Command</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="Command">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit
                    </label>
                    <select
                      value={state.command.unit || ""}
                      onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                    >
                      <option value="">—</option>
                      {COMMAND_UNIT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Command Post Location
                    </label>
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                        {o}
                      </Pill>
                    ))}

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Command Transfer
                    </div>
                    {COMMAND_TRANSFER_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                        {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                          <div className="mb-1.5 pl-1">
                            {["Investigative", "Offensive", "Defensive"].map((o) => (
                              <Pill
                                key={o}
                                active={state.strategyConfirmationMode === o}
                                onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                                color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                              >
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>

                  <Section title="Follow-Up">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Incident Type
                    </label>
                    <select
                      value={state.confinedSpace.followUp.incidentType || ""}
                      onChange={(e) => setTechRescueNestedField("confinedSpace", "followUp", "incidentType", e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {["Permit Required", "Non-Permit Required", "Alternative Entry Space", "Other"].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.confinedSpace.followUp.incidentType === "Other" && (
                      <TextField
                        className="mt-2"
                        value={state.confinedSpace.followUp.incidentTypeOther}
                        onChange={(v) => setTechRescueNestedField("confinedSpace", "followUp", "incidentTypeOther", v)}
                        placeholder="Specify"
                      />
                    )}

                    <div className="mt-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Number of Patients
                      </label>
                      <select
                        value={state.confinedSpace.numberOfPatients || ""}
                        onChange={(e) => setTechRescueField("confinedSpace", "numberOfPatients", e.target.value, `Confined Space Number of Patients: ${e.target.value}`)}
                        className="px-3 py-2 rounded text-sm outline-none w-28"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["1", "2", "3", "4", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {state.confinedSpace.numberOfPatients === "Other" && (
                        <TextField
                          className="mt-2 w-28"
                          value={state.confinedSpace.numberOfPatientsOther}
                          onChange={(v) => setTechRescueField("confinedSpace", "numberOfPatientsOther", v)}
                          placeholder="Specify"
                        />
                      )}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Confined Space Hazards
                    </div>
                    {hazardsOpenMap.confinedSpace ? (
                      <select
                        multiple
                        autoFocus
                        value={state.confinedSpace.followUp.trenchHazards}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                          setTechRescueNestedField("confinedSpace", "followUp", "trenchHazards", selected);
                        }}
                        onBlur={() => setHazardsOpenMap((m) => ({ ...m, confinedSpace: false }))}
                        size={5}
                        className="w-full px-3 py-2 rounded text-sm outline-none"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        {["Atmospheric", "Configuration", "Mechanical", "Electrical", "Thermal"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setHazardsOpenMap((m) => ({ ...m, confinedSpace: true }))}
                        className="w-full px-3 py-2 rounded text-sm text-left outline-none"
                        style={{
                          background: theme.panelAlt,
                          border: `1px solid ${theme.border}`,
                          color: state.confinedSpace.followUp.trenchHazards.length ? theme.textPrimary : theme.textDim,
                        }}
                      >
                        {state.confinedSpace.followUp.trenchHazards.length ? state.confinedSpace.followUp.trenchHazards.join(", ") : "—"}
                      </button>
                    )}
                    {state.confinedSpace.followUp.trenchHazards.includes("Other") && (
                      <TextField
                        className="mt-2"
                        value={state.confinedSpace.followUp.trenchHazardsOther}
                        onChange={(v) => setTechRescueNestedField("confinedSpace", "followUp", "trenchHazardsOther", v)}
                        placeholder="Specify"
                      />
                    )}
                  </Section>

                  <Section title="Communications">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      TAC Channel
                    </label>
                    <select
                      value={state.lifeFlight.tacChannel || ""}
                      onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-1"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {TAC_CHANNEL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.lifeFlight.tacChannel === "Other" && (
                      <TextField className="mb-3" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                    )}

                    <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                      Life Flight Response
                    </label>
                    {["Yes", "No"].map((o) => (
                      <Pill
                        key={o}
                        active={state.confinedSpace.lifeFlightResponse === o}
                        onClick={() => setTechRescueField("confinedSpace", "lifeFlightResponse", o, `Confined Space Life Flight Response: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}

                    {state.confinedSpace.lifeFlightResponse === "Yes" && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Ground Contact Channel
                        </label>
                        {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                          <Pill
                            key={o}
                            active={state.lifeFlight.groundContactChannel === o}
                            onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lifeFlight.groundContactChannel === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lifeFlight.groundContactChannelOther}
                            onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                            placeholder="Specify"
                          />
                        )}

                        <div className="mt-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Life Flight Unit
                          </label>
                          <select
                            value={state.lifeFlight.lifeFlightUnit || ""}
                            onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                            className="w-full px-3 py-2 rounded text-sm outline-none"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select unit</option>
                            {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {state.lifeFlight.lifeFlightUnit === "Other" && (
                            <TextField
                              className="mt-2"
                              value={state.lifeFlight.lifeFlightUnitOther}
                              onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                              placeholder="Specify"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Section>

                  {Array.from({ length: trenchPatientCount }).map((_, i) => {
                    const patient = state.confinedSpace.patients[i] || defaultTrenchPatient();
                    return (
                      <Section key={i} title={trenchPatientCount > 1 ? `Patient ${i + 1}` : "Patient Information"}>
                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Rescue or Recovery
                          </label>
                          {["Rescue", "Recovery"].map((o) => (
                            <Pill key={o} active={patient.rescueOrRecovery === o} onClick={() => setTrenchPatientField(i, "rescueOrRecovery", o)}>
                              {o}
                            </Pill>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <TextField label="Age" value={patient.age} onChange={(v) => setTrenchPatientField(i, "age", v)} placeholder="Age" />
                          <div>
                            <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Sex
                            </label>
                            {["Male", "Female"].map((o) => (
                              <Pill key={o} active={patient.sex === o} onClick={() => setTrenchPatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Weight
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <TextField value={patient.weightKg} onChange={(v) => handleTrenchPatientWeightChange(i, "kg", v)} placeholder="kgs" />
                            <TextField value={patient.weightLbs} onChange={(v) => handleTrenchPatientWeightChange(i, "lbs", v)} placeholder="lbs" />
                          </div>
                        </div>

                        <TextField
                          label="Problem Description"
                          value={patient.problemDescription}
                          onChange={(v) => setTrenchPatientField(i, "problemDescription", v)}
                          placeholder="Problem Description"
                        />
                      </Section>
                    );
                  })}
                </div>

                <GroupHeader>Units & Assignments</GroupHeader>
                <div className="grid grid-cols-1 gap-4">
                  <Section title="Units">
                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      Suppression
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {state.confinedSpace.suppressionUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("confinedSpace", "suppressionUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("confinedSpace", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("confinedSpace", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("confinedSpace", "suppressionUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {CONFINED_SPACE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("confinedSpace", "suppressionUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("confinedSpace", "suppressionUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("confinedSpace", "suppressionUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      EMS
                    </div>
                    <div className="flex flex-col gap-2">
                      {state.confinedSpace.emsUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("confinedSpace", "emsUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {MEDIC_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("confinedSpace", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("confinedSpace", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("confinedSpace", "emsUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {CONFINED_SPACE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("confinedSpace", "emsUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("confinedSpace", "emsUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("confinedSpace", "emsUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>
                  </Section>
                </div>

                <GroupHeader>Tactical Objectives</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-4">
                  <Section title="Benchmarks">
                    <AutoCheckRow label="Assign Rescue Group" unit={confinedSpaceDerived.rescueGroupUnit} />
                    <AutoCheckRow label="Assign Rescue Unit" unit={confinedSpaceDerived.rescueUnitUnit} />
                    <AutoCheckRow label="Assign Safety" unit={confinedSpaceDerived.safetyUnit} />
                    <AutoCheckRow label="Assign RIT" unit={confinedSpaceDerived.ritUnit} />
                    <AutoCheckRow label="Assign Medical Group" unit={confinedSpaceDerived.medicalGroupUnit} />
                    <AutoCheckRow label="Assign Medical Unit" unit={confinedSpaceDerived.medicalUnitUnit} />
                    <AutoCheckRow label="Assign Decon Group" unit={confinedSpaceDerived.deconGroupUnit} />
                    <AutoCheckRow label="Assign Rehab Group" unit={confinedSpaceDerived.rehabUnit} />

                    <CheckRow
                      label="Establish Zones"
                      value={state.confinedSpace.benchmarks.establishZones}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "establishZones", "Establish Zones")}
                    />
                    <CheckRow
                      label="Identify Immediate Hazards"
                      value={state.confinedSpace.benchmarks.identifyHazards}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                    />
                    {CONFINED_SPACE_LOGISTICS_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.key === "rescuerPpe" ? "PPE" : it.label}
                        value={state.confinedSpace.logistics[it.key]}
                        onToggle={() => toggleTechRescueNested("confinedSpace", "logistics", it.key, it.label)}
                      />
                    ))}
                    <CheckRow
                      label="Rescue / Recovery"
                      value={state.confinedSpace.benchmarks.rescueRecovery}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "rescueRecovery", "Rescue / Recovery")}
                    />
                    <CheckRow
                      label="PAR"
                      value={state.confinedSpace.benchmarks.pars}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "pars", "PAR")}
                    />
                    <CheckRow
                      label="Contact OSHA"
                      value={state.confinedSpace.benchmarks.contactOsha}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "contactOsha", "Contact OSHA")}
                    />
                    <CheckRow
                      label="After Action Review"
                      value={state.confinedSpace.benchmarks.afterActionReview}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "afterActionReview", "After Action Review")}
                    />
                    <CheckRow
                      label="Termination"
                      value={state.confinedSpace.benchmarks.termination}
                      onToggle={() => toggleTechRescueNested("confinedSpace", "benchmarks", "termination", "Termination")}
                    />
                  </Section>

                  <Section title="Incident Termination">
                    {INCIDENT_TERMINATION_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.confinedSpace.incidentTermination[it.key]}
                        onToggle={() => toggleTechRescueNested("confinedSpace", "incidentTermination", it.key, it.label)}
                      />
                    ))}
                  </Section>
                  </div>

                  <div className="flex flex-col gap-4">
                  <Section title="Pre-Entry">
                    {CONFINED_SPACE_PRE_ENTRY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.confinedSpace.preEntry[it.key]}
                        onToggle={() => toggleTechRescueNested("confinedSpace", "preEntry", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <Section title="Air Monitoring">
                    {HAZMAT_AIR_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.confinedSpace.airMonitoring[it.key]}
                        onToggle={() => toggleTechRescueNested("confinedSpace", "airMonitoring", it.key, it.label)}
                        value={state.confinedSpace.airMonitoring[it.key + "Value"]}
                        onChange={(v) => setTechRescueNestedField("confinedSpace", "airMonitoring", it.key + "Value", v)}
                      />
                    ))}
                    <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                        SCBA Required
                      </div>
                      <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                        {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                          <li key={t} className="mb-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section title="Rescue / Recovery">
                    {CONFINED_SPACE_RESCUE_RECOVERY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.confinedSpace.rescueRecovery[it.key]}
                        onToggle={() => toggleTechRescueNested("confinedSpace", "rescueRecovery", it.key, it.label)}
                      />
                    ))}
                  </Section>
                  </div>
                </div>

                <GroupHeader>Support</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <CollapsibleSection title="Mutual Aid">
                    {HAZMAT_MUTUAL_AID_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow
                          label={it.label}
                          value={state.confinedSpace.mutualAid[it.key]}
                          onToggle={() => toggleTechRescueMutualAid("confinedSpace", it.key, it.label)}
                        />
                        {it.key === "fire" && state.confinedSpace.mutualAid.fire != null && (
                          <select
                            value={state.confinedSpace.mutualAid.fireDept}
                            onChange={(e) => setTechRescueMutualAidField("confinedSpace", "fireDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                        {it.key === "hazmat" && state.confinedSpace.mutualAid.hazmat != null && (
                          <select
                            value={state.confinedSpace.mutualAid.hazmatDept}
                            onChange={(e) => setTechRescueMutualAidField("confinedSpace", "hazmatDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    ))}
                    <CheckRow
                      label="OSHA"
                      value={state.confinedSpace.mutualAid.osha}
                      onToggle={() => toggleTechRescueMutualAid("confinedSpace", "osha", "OSHA")}
                    />
                  </CollapsibleSection>
                </div>
                </div>
              ) : specialOpsSubTab === "Technical Rescue" && techRescueSubTab === "Structural Collapse" ? (
                <div className="flex flex-col gap-6">
                <GroupHeader>Size-Up & Command</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="Command">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit
                    </label>
                    <select
                      value={state.command.unit || ""}
                      onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                    >
                      <option value="">—</option>
                      {COMMAND_UNIT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Command Post Location
                    </label>
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                        {o}
                      </Pill>
                    ))}

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Command Transfer
                    </div>
                    {COMMAND_TRANSFER_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                        {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                          <div className="mb-1.5 pl-1">
                            {["Investigative", "Offensive", "Defensive"].map((o) => (
                              <Pill
                                key={o}
                                active={state.strategyConfirmationMode === o}
                                onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                                color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                              >
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>

                  <Section title="Follow-Up">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Incident Type
                    </label>
                    <select
                      value={state.structuralCollapse.followUp.incidentType || ""}
                      onChange={(e) => setTechRescueNestedField("structuralCollapse", "followUp", "incidentType", e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {["V-Shaped Collapse", "A-Frame Collapse", "Lean-To Collapse", "Pancake Collapse", "Cantilever Collapse", "Progressive Collapse", "Other"].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.structuralCollapse.followUp.incidentType === "Other" && (
                      <TextField
                        className="mt-2"
                        value={state.structuralCollapse.followUp.incidentTypeOther}
                        onChange={(v) => setTechRescueNestedField("structuralCollapse", "followUp", "incidentTypeOther", v)}
                        placeholder="Specify"
                      />
                    )}

                    <div className="mt-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Number of Patients
                      </label>
                      <select
                        value={state.structuralCollapse.numberOfPatients || ""}
                        onChange={(e) => setTechRescueField("structuralCollapse", "numberOfPatients", e.target.value, `Structural Collapse Number of Patients: ${e.target.value}`)}
                        className="px-3 py-2 rounded text-sm outline-none w-28"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["1", "2", "3", "4", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {state.structuralCollapse.numberOfPatients === "Other" && (
                        <TextField
                          className="mt-2 w-28"
                          value={state.structuralCollapse.numberOfPatientsOther}
                          onChange={(v) => setTechRescueField("structuralCollapse", "numberOfPatientsOther", v)}
                          placeholder="Specify"
                        />
                      )}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Structural Collapse Hazards
                    </div>
                    {hazardsOpenMap.structuralCollapse ? (
                      <select
                        multiple
                        autoFocus
                        value={state.structuralCollapse.followUp.trenchHazards}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                          setTechRescueNestedField("structuralCollapse", "followUp", "trenchHazards", selected);
                        }}
                        onBlur={() => setHazardsOpenMap((m) => ({ ...m, structuralCollapse: false }))}
                        size={5}
                        className="w-full px-3 py-2 rounded text-sm outline-none"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        {["Accessibility", "Secondary Collapse", "Soil Conditions", "Vibration", "Water", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setHazardsOpenMap((m) => ({ ...m, structuralCollapse: true }))}
                        className="w-full px-3 py-2 rounded text-sm text-left outline-none"
                        style={{
                          background: theme.panelAlt,
                          border: `1px solid ${theme.border}`,
                          color: state.structuralCollapse.followUp.trenchHazards.length ? theme.textPrimary : theme.textDim,
                        }}
                      >
                        {state.structuralCollapse.followUp.trenchHazards.length ? state.structuralCollapse.followUp.trenchHazards.join(", ") : "—"}
                      </button>
                    )}
                    {state.structuralCollapse.followUp.trenchHazards.includes("Other") && (
                      <TextField
                        className="mt-2"
                        value={state.structuralCollapse.followUp.trenchHazardsOther}
                        onChange={(v) => setTechRescueNestedField("structuralCollapse", "followUp", "trenchHazardsOther", v)}
                        placeholder="Specify"
                      />
                    )}
                  </Section>

                  <Section title="Communications">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      TAC Channel
                    </label>
                    <select
                      value={state.lifeFlight.tacChannel || ""}
                      onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-1"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {TAC_CHANNEL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.lifeFlight.tacChannel === "Other" && (
                      <TextField className="mb-3" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                    )}

                    <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                      Life Flight Response
                    </label>
                    {["Yes", "No"].map((o) => (
                      <Pill
                        key={o}
                        active={state.structuralCollapse.lifeFlightResponse === o}
                        onClick={() => setTechRescueField("structuralCollapse", "lifeFlightResponse", o, `Structural Collapse Life Flight Response: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}

                    {state.structuralCollapse.lifeFlightResponse === "Yes" && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Ground Contact Channel
                        </label>
                        {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                          <Pill
                            key={o}
                            active={state.lifeFlight.groundContactChannel === o}
                            onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lifeFlight.groundContactChannel === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lifeFlight.groundContactChannelOther}
                            onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                            placeholder="Specify"
                          />
                        )}

                        <div className="mt-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Life Flight Unit
                          </label>
                          <select
                            value={state.lifeFlight.lifeFlightUnit || ""}
                            onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                            className="w-full px-3 py-2 rounded text-sm outline-none"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select unit</option>
                            {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {state.lifeFlight.lifeFlightUnit === "Other" && (
                            <TextField
                              className="mt-2"
                              value={state.lifeFlight.lifeFlightUnitOther}
                              onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                              placeholder="Specify"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Section>

                  {Array.from({ length: trenchPatientCount }).map((_, i) => {
                    const patient = state.structuralCollapse.patients[i] || defaultTrenchPatient();
                    return (
                      <Section key={i} title={trenchPatientCount > 1 ? `Patient ${i + 1}` : "Patient Information"}>
                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Rescue or Recovery
                          </label>
                          {["Rescue", "Recovery"].map((o) => (
                            <Pill key={o} active={patient.rescueOrRecovery === o} onClick={() => setTrenchPatientField(i, "rescueOrRecovery", o)}>
                              {o}
                            </Pill>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <TextField label="Age" value={patient.age} onChange={(v) => setTrenchPatientField(i, "age", v)} placeholder="Age" />
                          <div>
                            <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Sex
                            </label>
                            {["Male", "Female"].map((o) => (
                              <Pill key={o} active={patient.sex === o} onClick={() => setTrenchPatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Weight
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <TextField value={patient.weightKg} onChange={(v) => handleTrenchPatientWeightChange(i, "kg", v)} placeholder="kgs" />
                            <TextField value={patient.weightLbs} onChange={(v) => handleTrenchPatientWeightChange(i, "lbs", v)} placeholder="lbs" />
                          </div>
                        </div>

                        <TextField
                          label="Problem Description"
                          value={patient.problemDescription}
                          onChange={(v) => setTrenchPatientField(i, "problemDescription", v)}
                          placeholder="Problem Description"
                        />
                      </Section>
                    );
                  })}
                </div>

                <GroupHeader>Units & Assignments</GroupHeader>
                <div className="grid grid-cols-1 gap-4">
                  <Section title="Units">
                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      Suppression
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {state.structuralCollapse.suppressionUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("structuralCollapse", "suppressionUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("structuralCollapse", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("structuralCollapse", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("structuralCollapse", "suppressionUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {STRUCTURAL_COLLAPSE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("structuralCollapse", "suppressionUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("structuralCollapse", "suppressionUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("structuralCollapse", "suppressionUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      EMS
                    </div>
                    <div className="flex flex-col gap-2">
                      {state.structuralCollapse.emsUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("structuralCollapse", "emsUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {MEDIC_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("structuralCollapse", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("structuralCollapse", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("structuralCollapse", "emsUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {STRUCTURAL_COLLAPSE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("structuralCollapse", "emsUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("structuralCollapse", "emsUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("structuralCollapse", "emsUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>
                  </Section>
                </div>

                <GroupHeader>Tactical Objectives</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-4">
                  <Section title="Benchmarks">
                    <AutoCheckRow label="Assign Shoring Unit" unit={structuralCollapseDerived.allUnits.find((u) => u.assign === "Shoring Unit")} />
                    <AutoCheckRow label="Assign Rescue Group" unit={structuralCollapseDerived.rescueGroupUnit} />
                    <AutoCheckRow label="Assign Rescue Unit" unit={structuralCollapseDerived.rescueUnitUnit} />
                    <AutoCheckRow label="Assign Safety" unit={structuralCollapseDerived.safetyUnit} />
                    <AutoCheckRow label="Assign RIT" unit={structuralCollapseDerived.ritUnit} />
                    <AutoCheckRow label="Assign Medical Group" unit={structuralCollapseDerived.medicalGroupUnit} />
                    <AutoCheckRow label="Assign Medical Unit" unit={structuralCollapseDerived.medicalUnitUnit} />
                    <AutoCheckRow label="Assign Rehab Group" unit={structuralCollapseDerived.rehabUnit} />

                    <CheckRow
                      label="Establish Zones"
                      value={state.structuralCollapse.benchmarks.establishZones}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "establishZones", "Establish Zones")}
                    />
                    <CheckRow
                      label="Identify Immediate Hazards"
                      value={state.structuralCollapse.benchmarks.identifyHazards}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                    />
                    <CheckRow
                      label="Identify Secondary Collapse"
                      value={state.structuralCollapse.benchmarks.identifySecondaryCollapse}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "identifySecondaryCollapse", "Identify Secondary Collapse")}
                    />
                    {CONFINED_SPACE_LOGISTICS_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.key === "rescuerPpe" ? "PPE" : it.label}
                        value={state.structuralCollapse.logistics[it.key]}
                        onToggle={() => toggleTechRescueNested("structuralCollapse", "logistics", it.key, it.label)}
                      />
                    ))}
                    <CheckRow
                      label="Rescue / Recovery"
                      value={state.structuralCollapse.benchmarks.rescueRecovery}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "rescueRecovery", "Rescue / Recovery")}
                    />
                    <CheckRow
                      label="PAR"
                      value={state.structuralCollapse.benchmarks.pars}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "pars", "PAR")}
                    />
                    <CheckRow
                      label="Contact OSHA"
                      value={state.structuralCollapse.benchmarks.contactOsha}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "contactOsha", "Contact OSHA")}
                    />
                    <CheckRow
                      label="After Action Review"
                      value={state.structuralCollapse.benchmarks.afterActionReview}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "afterActionReview", "After Action Review")}
                    />
                    <CheckRow
                      label="Termination"
                      value={state.structuralCollapse.benchmarks.termination}
                      onToggle={() => toggleTechRescueNested("structuralCollapse", "benchmarks", "termination", "Termination")}
                    />
                  </Section>

                  <Section title="Incident Termination">
                    {INCIDENT_TERMINATION_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.structuralCollapse.incidentTermination[it.key]}
                        onToggle={() => toggleTechRescueNested("structuralCollapse", "incidentTermination", it.key, it.label)}
                      />
                    ))}
                  </Section>
                  </div>

                  <div className="flex flex-col gap-4">
                  <Section title="Pre-Entry">
                    {STRUCTURAL_COLLAPSE_PRE_ENTRY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.structuralCollapse.preEntry[it.key]}
                        onToggle={() => toggleTechRescueNested("structuralCollapse", "preEntry", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <Section title="Air Monitoring">
                    {HAZMAT_AIR_FIELDS.map((it) => (
                      <CheckTextRow
                        key={it.key}
                        label={it.label}
                        checked={state.structuralCollapse.airMonitoring[it.key]}
                        onToggle={() => toggleTechRescueNested("structuralCollapse", "airMonitoring", it.key, it.label)}
                        value={state.structuralCollapse.airMonitoring[it.key + "Value"]}
                        onChange={(v) => setTechRescueNestedField("structuralCollapse", "airMonitoring", it.key + "Value", v)}
                      />
                    ))}
                    <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                        SCBA Required
                      </div>
                      <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                        {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                          <li key={t} className="mb-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section title="Rescue / Recovery">
                    {CONFINED_SPACE_RESCUE_RECOVERY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.structuralCollapse.rescueRecovery[it.key]}
                        onToggle={() => toggleTechRescueNested("structuralCollapse", "rescueRecovery", it.key, it.label)}
                      />
                    ))}
                  </Section>
                  </div>
                </div>

                <GroupHeader>Support</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <CollapsibleSection title="Mutual Aid">
                    {STRUCTURAL_COLLAPSE_MUTUAL_AID_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow
                          label={it.label}
                          value={state.structuralCollapse.mutualAid[it.key]}
                          onToggle={() => toggleTechRescueMutualAid("structuralCollapse", it.key, it.label)}
                        />
                        {it.key === "fire" && state.structuralCollapse.mutualAid.fire != null && (
                          <select
                            value={state.structuralCollapse.mutualAid.fireDept}
                            onChange={(e) => setTechRescueMutualAidField("structuralCollapse", "fireDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                        {it.key === "hazmat" && state.structuralCollapse.mutualAid.hazmat != null && (
                          <select
                            value={state.structuralCollapse.mutualAid.hazmatDept}
                            onChange={(e) => setTechRescueMutualAidField("structuralCollapse", "hazmatDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    ))}
                    <CheckRow
                      label="OSHA"
                      value={state.structuralCollapse.mutualAid.osha}
                      onToggle={() => toggleTechRescueMutualAid("structuralCollapse", "osha", "OSHA")}
                    />
                  </CollapsibleSection>
                </div>
                </div>
              ) : specialOpsSubTab === "Technical Rescue" && techRescueSubTab === "Water Rescue" ? (
                <div className="flex flex-col gap-6">
                <GroupHeader>Size-Up & Command</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="Command">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Unit
                    </label>
                    <select
                      value={state.command.unit || ""}
                      onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                    >
                      <option value="">—</option>
                      {COMMAND_UNIT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>

                    <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Command Post Location
                    </label>
                    {SIDE_OPTS.map((o) => (
                      <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                        {o}
                      </Pill>
                    ))}

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Command Transfer
                    </div>
                    {ROPE_RESCUE_COMMAND_TRANSFER_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                        {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                          <div className="mb-1.5 pl-1">
                            {["Investigative", "Offensive", "Defensive"].map((o) => (
                              <Pill
                                key={o}
                                active={state.strategyConfirmationMode === o}
                                onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                                color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                              >
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </Section>

                  <Section title="Follow-Up">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      Incident Type
                    </label>
                    <select
                      value={state.waterRescue.followUp.incidentType || ""}
                      onChange={(e) => setTechRescueNestedField("waterRescue", "followUp", "incidentType", e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {["Bayou/Creek Rescue", "Flood Water Rescue", "Lake Rescue", "Sinking Vehicle", "Swift Water Rescue"].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.waterRescue.followUp.incidentType === "Other" && (
                      <TextField
                        className="mt-2"
                        value={state.waterRescue.followUp.incidentTypeOther}
                        onChange={(v) => setTechRescueNestedField("waterRescue", "followUp", "incidentTypeOther", v)}
                        placeholder="Specify"
                      />
                    )}

                    <div className="mt-3">
                      <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                        Number of Patients
                      </label>
                      <select
                        value={state.waterRescue.numberOfPatients || ""}
                        onChange={(e) => setTechRescueField("waterRescue", "numberOfPatients", e.target.value, `Water Rescue Number of Patients: ${e.target.value}`)}
                        className="px-3 py-2 rounded text-sm outline-none w-28"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">—</option>
                        {["1", "2", "3", "4", "Other"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {state.waterRescue.numberOfPatients === "Other" && (
                        <TextField
                          className="mt-2 w-28"
                          value={state.waterRescue.numberOfPatientsOther}
                          onChange={(v) => setTechRescueField("waterRescue", "numberOfPatientsOther", v)}
                          placeholder="Specify"
                        />
                      )}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                      Water Rescue Hazards
                    </div>
                    {hazardsOpenMap.waterRescue ? (
                      <select
                        multiple
                        autoFocus
                        value={state.waterRescue.followUp.trenchHazards}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                          setTechRescueNestedField("waterRescue", "followUp", "trenchHazards", selected);
                        }}
                        onBlur={() => setHazardsOpenMap((m) => ({ ...m, waterRescue: false }))}
                        size={5}
                        className="w-full px-3 py-2 rounded text-sm outline-none"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        {["Accessibility", "Swift Water"].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setHazardsOpenMap((m) => ({ ...m, waterRescue: true }))}
                        className="w-full px-3 py-2 rounded text-sm text-left outline-none"
                        style={{
                          background: theme.panelAlt,
                          border: `1px solid ${theme.border}`,
                          color: state.waterRescue.followUp.trenchHazards.length ? theme.textPrimary : theme.textDim,
                        }}
                      >
                        {state.waterRescue.followUp.trenchHazards.length ? state.waterRescue.followUp.trenchHazards.join(", ") : "—"}
                      </button>
                    )}
                    {state.waterRescue.followUp.trenchHazards.includes("Other") && (
                      <TextField
                        className="mt-2"
                        value={state.waterRescue.followUp.trenchHazardsOther}
                        onChange={(v) => setTechRescueNestedField("waterRescue", "followUp", "trenchHazardsOther", v)}
                        placeholder="Specify"
                      />
                    )}
                  </Section>

                  <Section title="Communications">
                    <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                      TAC Channel
                    </label>
                    <select
                      value={state.lifeFlight.tacChannel || ""}
                      onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                      className="w-full px-3 py-2 rounded text-sm outline-none mb-1"
                      style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    >
                      <option value="">—</option>
                      {TAC_CHANNEL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {state.lifeFlight.tacChannel === "Other" && (
                      <TextField className="mb-3" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                    )}

                    <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                      Life Flight Response
                    </label>
                    {["Yes", "No"].map((o) => (
                      <Pill
                        key={o}
                        active={state.waterRescue.lifeFlightResponse === o}
                        onClick={() => setTechRescueField("waterRescue", "lifeFlightResponse", o, `Water Rescue Life Flight Response: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}

                    {state.waterRescue.lifeFlightResponse === "Yes" && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                        <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                          Ground Contact Channel
                        </label>
                        {GROUND_CONTACT_CHANNEL_OPTIONS.map((o) => (
                          <Pill
                            key={o}
                            active={state.lifeFlight.groundContactChannel === o}
                            onClick={() => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lifeFlight.groundContactChannel === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lifeFlight.groundContactChannelOther}
                            onChange={(v) => setLifeFlightField("groundContactChannelOther", v)}
                            placeholder="Specify"
                          />
                        )}

                        <div className="mt-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Life Flight Unit
                          </label>
                          <select
                            value={state.lifeFlight.lifeFlightUnit || ""}
                            onChange={(e) => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`)}
                            className="w-full px-3 py-2 rounded text-sm outline-none"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select unit</option>
                            {LIFE_FLIGHT_UNIT_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {state.lifeFlight.lifeFlightUnit === "Other" && (
                            <TextField
                              className="mt-2"
                              value={state.lifeFlight.lifeFlightUnitOther}
                              onChange={(v) => setLifeFlightField("lifeFlightUnitOther", v)}
                              placeholder="Specify"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Section>

                  {Array.from({ length: trenchPatientCount }).map((_, i) => {
                    const patient = state.waterRescue.patients[i] || defaultTrenchPatient();
                    return (
                      <Section key={i} title={trenchPatientCount > 1 ? `Patient ${i + 1}` : "Patient Information"}>
                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Rescue or Recovery
                          </label>
                          {["Rescue", "Recovery"].map((o) => (
                            <Pill key={o} active={patient.rescueOrRecovery === o} onClick={() => setTrenchPatientField(i, "rescueOrRecovery", o)}>
                              {o}
                            </Pill>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <TextField label="Age" value={patient.age} onChange={(v) => setTrenchPatientField(i, "age", v)} placeholder="Age" />
                          <div>
                            <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Sex
                            </label>
                            {["Male", "Female"].map((o) => (
                              <Pill key={o} active={patient.sex === o} onClick={() => setTrenchPatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                            Weight
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <TextField value={patient.weightKg} onChange={(v) => handleTrenchPatientWeightChange(i, "kg", v)} placeholder="kgs" />
                            <TextField value={patient.weightLbs} onChange={(v) => handleTrenchPatientWeightChange(i, "lbs", v)} placeholder="lbs" />
                          </div>
                        </div>

                        <TextField
                          label="Problem Description"
                          value={patient.problemDescription}
                          onChange={(v) => setTrenchPatientField(i, "problemDescription", v)}
                          placeholder="Problem Description"
                        />
                      </Section>
                    );
                  })}
                </div>

                <GroupHeader>Units & Assignments</GroupHeader>
                <div className="grid grid-cols-1 gap-4">
                  <Section title="Units">
                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      Suppression
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {state.waterRescue.suppressionUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("waterRescue", "suppressionUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {WATER_RESCUE_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("waterRescue", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("waterRescue", "suppressionUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("waterRescue", "suppressionUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {CONFINED_SPACE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("waterRescue", "suppressionUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("waterRescue", "suppressionUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("waterRescue", "suppressionUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                      EMS
                    </div>
                    <div className="flex flex-col gap-2">
                      {state.waterRescue.emsUnits.map((u) => (
                        <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                          <div className="flex items-center gap-2">
                            <select
                              value={u.unit}
                              onChange={(e) => updateTechRescueUnit("waterRescue", "emsUnits", u.id, "unit", e.target.value)}
                              className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                            >
                              <option value="">Unit</option>
                              {MEDIC_UNIT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => toggleTechRescueStaged("waterRescue", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.staged != null ? theme.greenDim : theme.bg,
                                border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                                color: u.staged != null ? theme.green : theme.textSecondary,
                              }}
                            >
                              {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                            </button>
                            <button
                              onClick={() => toggleTechRescueOnDeck("waterRescue", "emsUnits", u.id)}
                              className="px-2 py-1.5 rounded text-xs font-bold"
                              style={{
                                background: u.onDeck != null ? theme.amberDim : theme.bg,
                                border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                                color: u.onDeck != null ? theme.amber : theme.textSecondary,
                              }}
                            >
                              {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                            </button>
                            <select
                              value={u.assign}
                              onChange={(e) => updateTechRescueUnit("waterRescue", "emsUnits", u.id, "assign", e.target.value)}
                              className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            >
                              <option value="">Assignment</option>
                              {CONFINED_SPACE_ASSIGNMENT_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => removeTechRescueUnit("waterRescue", "emsUnits", u.id)} style={{ color: theme.textDim }}>
                              <X size={16} />
                            </button>
                          </div>
                          {u.onDeck != null && (
                            <div className="mt-2 pl-1">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("waterRescue", "emsUnits", u.id, o)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addTechRescueUnit("waterRescue", "emsUnits")}
                        className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                        style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                      >
                        <Plus size={14} /> Add Unit
                      </button>
                    </div>
                  </Section>
                </div>

                <GroupHeader>Tactical Objectives</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Section title="Benchmarks">
                    <AutoCheckRow label="Assign Rescue Group" unit={waterRescueDerived.rescueGroupUnit} />
                    <AutoCheckRow label="Assign Rescue Unit" unit={waterRescueDerived.rescueUnitUnit} />
                    <AutoCheckRow label="Assign Spotters" unit={waterRescueDerived.allUnits.find((u) => u.assign === "Spotters")} />
                    <AutoCheckRow label="Assign Safety" unit={waterRescueDerived.safetyUnit} />
                    <AutoCheckRow label="Assign RIT" unit={waterRescueDerived.ritUnit} />
                    <AutoCheckRow label="Assign Medical Group" unit={waterRescueDerived.medicalGroupUnit} />
                    <AutoCheckRow label="Assign Medical Unit" unit={waterRescueDerived.medicalUnitUnit} />
                    <AutoCheckRow label="Assign Rehab Group" unit={waterRescueDerived.rehabUnit} />

                    <CheckRow
                      label="Establish Zones"
                      value={state.waterRescue.benchmarks.establishZones}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "establishZones", "Establish Zones")}
                    />
                    <CheckRow
                      label="Identify Immediate Hazards"
                      value={state.waterRescue.benchmarks.identifyHazards}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                    />
                    <CheckRow
                      label="PFD & Helmet"
                      value={state.waterRescue.benchmarks.pfdHelmet}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "pfdHelmet", "PFD & Helmet")}
                    />
                    {WATER_RESCUE_BENCHMARKS_LOGISTICS_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.waterRescue.logistics[it.key]}
                        onToggle={() => toggleTechRescueNested("waterRescue", "logistics", it.key, it.label)}
                      />
                    ))}
                    <CheckRow
                      label="Rescue / Recovery"
                      value={state.waterRescue.benchmarks.rescueRecovery}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "rescueRecovery", "Rescue / Recovery")}
                    />
                    <CheckRow
                      label="PAR"
                      value={state.waterRescue.benchmarks.pars}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "pars", "PAR")}
                    />
                    <CheckRow
                      label="After Action Review"
                      value={state.waterRescue.benchmarks.afterActionReview}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "afterActionReview", "After Action Review")}
                    />
                    <CheckRow
                      label="Termination"
                      value={state.waterRescue.benchmarks.termination}
                      onToggle={() => toggleTechRescueNested("waterRescue", "benchmarks", "termination", "Termination")}
                    />
                  </Section>

                  <div className="flex flex-col gap-4">
                  <Section title="Pre-Entry">
                    {WATER_RESCUE_PRE_ENTRY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.waterRescue.preEntry[it.key]}
                        onToggle={() => toggleTechRescueNested("waterRescue", "preEntry", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <Section title="Rescue / Recovery">
                    {CONFINED_SPACE_RESCUE_RECOVERY_ITEMS.map((it) => (
                      <CheckRow
                        key={it.key}
                        label={it.label}
                        value={state.waterRescue.rescueRecovery[it.key]}
                        onToggle={() => toggleTechRescueNested("waterRescue", "rescueRecovery", it.key, it.label)}
                      />
                    ))}
                  </Section>

                  <div className="flex-1">
                    <Section title="Incident Termination" fill>
                      {WATER_RESCUE_INCIDENT_TERMINATION_ITEMS.map((it) => (
                        <CheckRow
                          key={it.key}
                          label={it.label}
                          value={state.waterRescue.incidentTermination[it.key]}
                          onToggle={() => toggleTechRescueNested("waterRescue", "incidentTermination", it.key, it.label)}
                        />
                      ))}
                    </Section>
                  </div>
                  </div>
                </div>

                <GroupHeader>Support</GroupHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <CollapsibleSection title="Mutual Aid">
                    {WATER_RESCUE_MUTUAL_AID_ITEMS.map((it) => (
                      <React.Fragment key={it.key}>
                        <CheckRow
                          label={it.label}
                          value={state.waterRescue.mutualAid[it.key]}
                          onToggle={() => toggleTechRescueMutualAid("waterRescue", it.key, it.label)}
                        />
                        {it.key === "fire" && state.waterRescue.mutualAid.fire != null && (
                          <select
                            value={state.waterRescue.mutualAid.fireDept}
                            onChange={(e) => setTechRescueMutualAidField("waterRescue", "fireDept", e.target.value)}
                            className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                            style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Select department</option>
                            {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    ))}
                  </CollapsibleSection>
                </div>
                </div>
              ) : specialOpsSubTab === "Gas Leak" ? (
                <div className="flex flex-col gap-6">
            <GroupHeader>Size-Up & Command</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Section title="Command">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Unit
                </label>
                <select
                  value={state.command.unit || ""}
                  onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                >
                  <option value="">—</option>
                  {COMMAND_UNIT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Command Post Location
                </label>
                {SIDE_OPTS.map((o) => (
                  <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                    {o}
                  </Pill>
                ))}

                <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                  TAC Channel
                </label>
                <select
                  value={state.lifeFlight.tacChannel || ""}
                  onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                  className="px-3 py-2 rounded text-sm outline-none w-32"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                >
                  <option value="">—</option>
                  {TAC_CHANNEL_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {state.lifeFlight.tacChannel === "Other" && (
                  <TextField className="mt-2 w-32" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                )}

                <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                  Command Transfer
                </div>
                {LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                    {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                      <div className="mb-1.5 pl-1">
                        {["Investigative", "Offensive", "Defensive"].map((o) => (
                          <Pill
                            key={o}
                            active={state.strategyConfirmationMode === o}
                            onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                            color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Section>

              <Section title="Follow-Up">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Incident Type
                </label>
                <div className="mb-3">
                  {["Commercial", "Residential"].map((o) => (
                    <Pill key={o} active={state.gasLeak.followUp.incidentType === o} onClick={() => setTechRescueNestedField("gasLeak", "followUp", "incidentType", o)}>
                      {o}
                    </Pill>
                  ))}
                </div>

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  360
                </label>
                <CheckRow label="360" value={state.gasLeak.followUp.threeSixty} onToggle={() => toggleTechRescueNested("gasLeak", "followUp", "threeSixty", "360")} />
                {state.gasLeak.followUp.threeSixty != null && (
                  <div className="mb-3">
                    {["Complete", "Incomplete"].map((o) => (
                      <Pill key={o} active={state.gasLeak.followUp.threeSixtyStatus === o} onClick={() => setTechRescueNestedField("gasLeak", "followUp", "threeSixtyStatus", o, `360 status: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                    {state.gasLeak.followUp.threeSixtyStatus === "Incomplete" && (
                      <div className="mt-2">
                        {["Size", "Accessibility", "Hazard", "Other"].map((o) => (
                          <Pill
                            key={o}
                            active={state.gasLeak.followUp.threeSixtyIncompleteReason === o}
                            onClick={() => setTechRescueNestedField("gasLeak", "followUp", "threeSixtyIncompleteReason", o, `360 Incomplete: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.gasLeak.followUp.threeSixtyIncompleteReason === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.gasLeak.followUp.threeSixtyIncompleteOther}
                            onChange={(v) => setTechRescueNestedField("gasLeak", "followUp", "threeSixtyIncompleteOther", v)}
                            placeholder="Specify"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Number of Patients
                </label>
                <select
                  value={state.gasLeak.followUp.numberOfPatients || ""}
                  onChange={(e) => setTechRescueNestedField("gasLeak", "followUp", "numberOfPatients", e.target.value, `Number of Patients: ${e.target.value}`)}
                  className="px-3 py-2 rounded text-sm outline-none w-28"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                >
                  <option value="">—</option>
                  {["1", "2", "3", "4", "Other"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {state.gasLeak.followUp.numberOfPatients === "Other" && (
                  <TextField
                    className="mt-2 w-28"
                    value={state.gasLeak.followUp.numberOfPatientsOther}
                    onChange={(v) => setTechRescueNestedField("gasLeak", "followUp", "numberOfPatientsOther", v)}
                    placeholder="Specify"
                  />
                )}
              </Section>
            </div>

            <GroupHeader>Units & Assignments</GroupHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { key: "suppressionUnits", title: "Suppression", unitOptions: UNIT_OPTIONS, assignOptions: GAS_LEAK_ASSIGNMENT_OPTIONS },
                { key: "emsUnits", title: "EMS", unitOptions: MEDIC_UNIT_OPTIONS, assignOptions: GAS_LEAK_ASSIGNMENT_OPTIONS },
              ].map(({ key, title, unitOptions, assignOptions }) => (
                <Section key={key} title={title}>
                  <div className="flex flex-col gap-2">
                    {state.gasLeak[key].map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 rounded" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <select
                          value={u.unit}
                          onChange={(e) => updateGasLeakUnit(key, u.id, "unit", e.target.value)}
                          className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                        >
                          <option value="">Unit</option>
                          {unitOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <select
                          value={u.assign}
                          onChange={(e) => updateGasLeakUnit(key, u.id, "assign", e.target.value)}
                          className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        >
                          <option value="">Assignment</option>
                          {assignOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => removeGasLeakUnit(key, u.id)} style={{ color: theme.textDim }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addGasLeakUnit(key)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>
                </Section>
              ))}
            </div>

            <GroupHeader>Tactical Objectives</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Section title="Benchmarks">
                <AutoCheckRow label="Assign Investigating Unit" unit={gasLeakDerived.allUnits.find((u) => u.assign === "Investigating")} />
                <AutoCheckRow label="Assign Safety" unit={gasLeakDerived.safetyUnit} />
                <AutoCheckRow label="Assign RIT" unit={gasLeakDerived.ritUnit} />
                <AutoCheckRow label="Assign Medical Group" unit={gasLeakDerived.medicalGroupUnit} />
                <AutoCheckRow label="Assign Medical Unit" unit={gasLeakDerived.medicalUnitUnit} />
                <AutoCheckRow label="Assign Rehab Group" unit={gasLeakDerived.rehabUnit} />

                <CheckRow
                  label="Establish Zones"
                  value={state.gasLeak.benchmarks.establishZones}
                  onToggle={() => toggleTechRescueNested("gasLeak", "benchmarks", "establishZones", "Establish Zones")}
                />
                <CheckRow
                  label="Evacuation / SIP Protocol"
                  value={state.gasLeak.benchmarks.evacuationSipProtocol}
                  onToggle={() => toggleTechRescueNested("gasLeak", "benchmarks", "evacuationSipProtocol", "Evacuation / SIP Protocol")}
                />
                <CheckRow
                  label="Identify Immediate Hazards"
                  value={state.gasLeak.benchmarks.identifyHazards}
                  onToggle={() => toggleTechRescueNested("gasLeak", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                />
                <CheckRow
                  label="PPE"
                  value={state.gasLeak.logistics.rescuerPpe}
                  onToggle={() => toggleTechRescueNested("gasLeak", "logistics", "rescuerPpe", "PPE")}
                />
                <CheckRow
                  label="PAR"
                  value={state.gasLeak.benchmarks.pars}
                  onToggle={() => toggleTechRescueNested("gasLeak", "benchmarks", "pars", "PAR")}
                />
                <CheckRow
                  label="Termination"
                  value={state.gasLeak.benchmarks.termination}
                  onToggle={() => toggleTechRescueNested("gasLeak", "benchmarks", "termination", "Termination")}
                />
              </Section>

              <Section title="Air Monitoring">
                {HAZMAT_AIR_FIELDS.map((it) => (
                  <CheckTextRow
                    key={it.key}
                    label={it.label}
                    checked={state.gasLeak[it.key]}
                    onToggle={() => toggleSimple("gasLeak", it.key, it.label)}
                    value={state.gasLeak[it.key + "Value"]}
                    onChange={(v) => setGasLeakField(it.key + "Value", v)}
                  />
                ))}
                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                  <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                    SCBA Required
                  </div>
                  <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                    {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                      <li key={t} className="mb-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            </div>

            <GroupHeader>Support</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CollapsibleSection title="Utilities">
                {UTILITIES_ITEMS.map((it) => (
                  <CheckRow key={it.key} label={it.label} value={state.gasLeak.utilities[it.key]} onToggle={() => toggleTechRescueNested("gasLeak", "utilities", it.key, it.label)} />
                ))}
              </CollapsibleSection>

              <CollapsibleSection title="Mutual Aid">
                {HAZMAT_MUTUAL_AID_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.gasLeak.mutualAid[it.key]} onToggle={() => toggleTechRescueMutualAid("gasLeak", it.key, it.label)} />
                    {it.key === "fire" && state.gasLeak.mutualAid.fire != null && (
                      <select
                        value={state.gasLeak.mutualAid.fireDept}
                        onChange={(e) => setTechRescueMutualAidField("gasLeak", "fireDept", e.target.value)}
                        className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">Select department</option>
                        {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    )}
                    {it.key === "hazmat" && state.gasLeak.mutualAid.hazmat != null && (
                      <select
                        value={state.gasLeak.mutualAid.hazmatDept}
                        onChange={(e) => setTechRescueMutualAidField("gasLeak", "hazmatDept", e.target.value)}
                        className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">Select department</option>
                        {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    )}
                  </React.Fragment>
                ))}
              </CollapsibleSection>
            </div>

                </div>
              ) : specialOpsSubTab === "Lithium-Ion" ? (
                <div className="flex flex-col gap-6">
            <GroupHeader>Size-Up & Command</GroupHeader>
            <div className="grid grid-cols-2 gap-4">
              <Section title="Command">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Unit
                </label>
                <select
                  value={state.command.unit || ""}
                  onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                >
                  <option value="">—</option>
                  {COMMAND_UNIT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Command Post Location
                </label>
                {SIDE_OPTS.map((o) => (
                  <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                    {o}
                  </Pill>
                ))}

                <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                  TAC Channel
                </label>
                <select
                  value={state.lifeFlight.tacChannel || ""}
                  onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                  className="px-3 py-2 rounded text-sm outline-none w-32"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                >
                  <option value="">—</option>
                  {TAC_CHANNEL_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {state.lifeFlight.tacChannel === "Other" && (
                  <TextField className="mt-2 w-32" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                )}

                <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                  Command Transfer
                </div>
                <CheckRow label="PAR" value={state.lithiumIon.commandTransferPar} onToggle={toggleLithiumIonCommandPar} />
                {LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                    {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                      <div className="mb-1.5 pl-1">
                        {["Investigative", "Offensive", "Defensive"].map((o) => (
                          <Pill
                            key={o}
                            active={state.strategyConfirmationMode === o}
                            onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                            color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Section>

              <Section title="Follow-Up">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Incident Type
                </label>
                <select
                  value={state.lithiumIon.followUp.incidentType || ""}
                  onChange={(e) => setTechRescueNestedField("lithiumIon", "followUp", "incidentType", e.target.value, `Incident Type: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                >
                  <option value="">-</option>
                  {["BESS / ESS", "Electric / Hybrid Vehicle", "Personal Mobility Device"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  360
                </label>
                <CheckRow label="360" value={state.lithiumIon.followUp.threeSixty} onToggle={() => toggleTechRescueNested("lithiumIon", "followUp", "threeSixty", "360")} />
                {state.lithiumIon.followUp.threeSixty != null && (
                  <div className="mb-3">
                    {["Complete", "Incomplete"].map((o) => (
                      <Pill key={o} active={state.lithiumIon.followUp.threeSixtyStatus === o} onClick={() => setTechRescueNestedField("lithiumIon", "followUp", "threeSixtyStatus", o, `360 status: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                    {state.lithiumIon.followUp.threeSixtyStatus === "Incomplete" && (
                      <div className="mt-2">
                        {["Size", "Accessibility", "Hazard", "Other"].map((o) => (
                          <Pill
                            key={o}
                            active={state.lithiumIon.followUp.threeSixtyIncompleteReason === o}
                            onClick={() => setTechRescueNestedField("lithiumIon", "followUp", "threeSixtyIncompleteReason", o, `360 Incomplete: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.lithiumIon.followUp.threeSixtyIncompleteReason === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.lithiumIon.followUp.threeSixtyIncompleteOther}
                            onChange={(v) => setTechRescueNestedField("lithiumIon", "followUp", "threeSixtyIncompleteOther", v)}
                            placeholder="Specify"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

              </Section>
            </div>

            <GroupHeader>Units & Assignments</GroupHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { key: "suppressionUnits", title: "Suppression", unitOptions: UNIT_OPTIONS, assignOptions: LITHIUM_ION_ASSIGNMENT_OPTIONS },
                { key: "emsUnits", title: "EMS", unitOptions: MEDIC_UNIT_OPTIONS, assignOptions: LITHIUM_ION_ASSIGNMENT_OPTIONS },
              ].map(({ key, title, unitOptions, assignOptions }) => (
                <Section key={key} title={title}>
                  <div className="flex flex-col gap-2">
                    {state.lithiumIon[key].map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 rounded" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <select
                          value={u.unit}
                          onChange={(e) => updateLithiumIonUnit(key, u.id, "unit", e.target.value)}
                          className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                        >
                          <option value="">Unit</option>
                          {unitOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <select
                          value={u.assign}
                          onChange={(e) => updateLithiumIonUnit(key, u.id, "assign", e.target.value)}
                          className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        >
                          <option value="">Assignment</option>
                          {assignOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => removeLithiumIonUnit(key, u.id)} style={{ color: theme.textDim }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addLithiumIonUnit(key)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>
                </Section>
              ))}
            </div>

            <GroupHeader>Tactical Objectives</GroupHeader>
            <div className="grid grid-cols-2 gap-4">
              <Section title="Benchmarks">
                <CheckRow
                  label="Identify Immediate Hazards"
                  value={state.lithiumIon.benchmarks.identifyHazards}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "identifyHazards", "Identify Immediate Hazards")}
                />
                <CheckRow
                  label="PPE"
                  value={state.lithiumIon.logistics.rescuerPpe}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "logistics", "rescuerPpe", "PPE")}
                />
                <AutoCheckRow label="Assign Safety" unit={lithiumIonDerived.safetyUnit} />
                <AutoCheckRow label="Assign RIT" unit={lithiumIonDerived.ritUnit} />
                <CheckRow
                  label="Relocate Vehicle"
                  value={state.lithiumIon.benchmarks.relocateVehicle}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "relocateVehicle", "Relocate Vehicle")}
                />
                <CheckRow
                  label="Deploy Blanket"
                  value={state.lithiumIon.benchmarks.deployBlanket}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "deployBlanket", "Deploy Blanket")}
                />
                <CheckRow
                  label="Establish Zones"
                  value={state.lithiumIon.benchmarks.establishZones}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "establishZones", "Establish Zones")}
                />
                <CheckRow
                  label="PAR"
                  value={state.lithiumIon.benchmarks.pars}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "pars", "PAR")}
                />
                <CheckRow
                  label="Contact HAZMAT"
                  value={state.lithiumIon.benchmarks.contactHazmat}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "contactHazmat", "Contact HAZMAT")}
                />
                <CheckRow
                  label="Termination"
                  value={state.lithiumIon.benchmarks.termination}
                  onToggle={() => toggleTechRescueNested("lithiumIon", "benchmarks", "termination", "Termination")}
                />
              </Section>

              <Section title="Air Monitoring">
                {HAZMAT_AIR_FIELDS.map((it) => (
                  <CheckTextRow
                    key={it.key}
                    label={it.label}
                    checked={state.lithiumIon[it.key]}
                    onToggle={() => toggleSimple("lithiumIon", it.key, it.label)}
                    value={state.lithiumIon[it.key + "Value"]}
                    onChange={(v) => setLithiumIonField(it.key + "Value", v)}
                  />
                ))}
                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${theme.borderSoft}` }}>
                  <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                    SCBA Required
                  </div>
                  <ul className="text-sm" style={{ color: theme.textPrimary, paddingLeft: "1.1rem", listStyleType: "disc" }}>
                    {HAZMAT_SCBA_THRESHOLDS.map((t) => (
                      <li key={t} className="mb-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            </div>

            <GroupHeader>Support</GroupHeader>
            <div className="grid grid-cols-2 gap-4">
              <CollapsibleSection title="Utilities">
                {UTILITIES_ITEMS.map((it) => (
                  <CheckRow key={it.key} label={it.label} value={state.lithiumIon.utilities[it.key]} onToggle={() => toggleTechRescueNested("lithiumIon", "utilities", it.key, it.label)} />
                ))}
              </CollapsibleSection>

              <CollapsibleSection title="Mutual Aid">
                {HAZMAT_MUTUAL_AID_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.lithiumIon.mutualAid[it.key]} onToggle={() => toggleTechRescueMutualAid("lithiumIon", it.key, it.label)} />
                    {it.key === "fire" && state.lithiumIon.mutualAid.fire != null && (
                      <select
                        value={state.lithiumIon.mutualAid.fireDept}
                        onChange={(e) => setTechRescueMutualAidField("lithiumIon", "fireDept", e.target.value)}
                        className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">Select department</option>
                        {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    )}
                    {it.key === "hazmat" && state.lithiumIon.mutualAid.hazmat != null && (
                      <select
                        value={state.lithiumIon.mutualAid.hazmatDept}
                        onChange={(e) => setTechRescueMutualAidField("lithiumIon", "hazmatDept", e.target.value)}
                        className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                        style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                      >
                        <option value="">Select department</option>
                        {HAZMAT_MUTUAL_AID_DEPTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    )}
                  </React.Fragment>
                ))}
              </CollapsibleSection>
            </div>

                </div>
              ) : (
                <Section title={specialOpsSubTab === "Technical Rescue" ? techRescueSubTab : specialOpsSubTab}>
                  <div className="text-sm py-6 text-center" style={{ color: theme.textDim }}>
                    Content coming soon — let me know what you'd like on this tab.
                  </div>
                </Section>
              )}
            </div>
          )}

          {tab === "wildland" && (
            <div className="flex flex-col gap-6">
            <GroupHeader>Size-Up & Command</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Section title="Command">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Unit
                </label>
                <select
                  value={state.command.unit || ""}
                  onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                >
                  <option value="">—</option>
                  {COMMAND_UNIT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-2" />

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Command Post Location
                </label>
                {[...SIDE_OPTS, "Other"].map((o) => (
                  <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                {state.command.location === "Other" && (
                  <TextField
                    className="mt-2"
                    value={state.command.locationOther}
                    onChange={(v) => setCommand("locationOther", v)}
                    placeholder="Command Post Location"
                  />
                )}

                <div className="text-xs font-bold uppercase tracking-wide mb-1 mt-2 pt-2" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                  Command Transfer
                </div>
                {LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                    {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                      <div className="mb-1.5 pl-1">
                        {["Investigative", "Offensive", "Defensive"].map((o) => (
                          <Pill
                            key={o}
                            active={state.strategyConfirmationMode === o}
                            onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                            color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Section>

              <Section title="Follow-Up">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Incident Type
                </label>
                <div className="mb-3">
                  {["Controlled Burn", "Light Fuel", "Heavy Fuel"].map((o) => (
                    <Pill key={o} active={state.wildland.problem === o} onClick={() => setWildlandField("problem", o, `Incident Type: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  360
                </label>
                <CheckRow label="360" value={state.wildland.threeSixty} onToggle={() => toggleWildlandField("threeSixty", "360")} />
                {state.wildland.threeSixty != null && (
                  <div className="mb-3">
                    {["Complete", "Incomplete"].map((o) => (
                      <Pill key={o} active={state.wildland.threeSixtyStatus === o} onClick={() => setWildlandField("threeSixtyStatus", o, `360 status: ${o}`)}>
                        {o}
                      </Pill>
                    ))}
                    {state.wildland.threeSixtyStatus === "Incomplete" && (
                      <div className="mt-2">
                        {["Size", "Accessibility", "Hazard", "Other"].map((o) => (
                          <Pill
                            key={o}
                            active={state.wildland.threeSixtyIncompleteReason === o}
                            onClick={() => setWildlandField("threeSixtyIncompleteReason", o, `360 Incomplete: ${o}`)}
                          >
                            {o}
                          </Pill>
                        ))}
                        {state.wildland.threeSixtyIncompleteReason === "Other" && (
                          <TextField
                            className="mt-2"
                            value={state.wildland.threeSixtyIncompleteOther}
                            onChange={(v) => setWildlandField("threeSixtyIncompleteOther", v)}
                            placeholder="Specify"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Size
                </label>
                <div className="mb-3">
                  {["< 1 Acre", "1-5 Acre", "> 5 Acre"].map((o) => (
                    <Pill key={o} active={state.wildland.size === o} onClick={() => setWildlandField("size", o, `Size: ${o}`)}>
                      {o}
                    </Pill>
                  ))}
                </div>

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Hazards
                </label>
                {["Yes", "No"].map((o) => (
                  <Pill key={o} active={state.wildland.hazards === o} onClick={() => setWildlandField("hazards", o, `Hazards: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                {state.wildland.hazards === "Yes" && (
                  <>
                    <div className="mt-2">
                      {SIDE_OPTS.map((o) => (
                        <Pill
                          key={o}
                          active={state.wildland["hazards" + o] != null}
                          onClick={() => toggleWildlandField("hazards" + o, `Hazards Side ${o}`)}
                        >
                          {o}
                        </Pill>
                      ))}
                    </div>
                    <TextField
                      className="mt-2 mb-3"
                      value={state.wildland.hazardsNote}
                      onChange={(v) => setWildlandField("hazardsNote", v)}
                      placeholder="Note any hazards"
                    />
                  </>
                )}

                <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                  Exposures
                </label>
                {["Yes", "No"].map((o) => (
                  <Pill key={o} active={state.wildland.exposures === o} onClick={() => setWildlandField("exposures", o, `Exposures: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                {state.wildland.exposures === "Yes" && (
                  <>
                    <div className="mt-2">
                      {SIDE_OPTS.map((o) => (
                        <Pill
                          key={o}
                          active={state.wildland["exposure" + o] != null}
                          onClick={() => toggleWildlandField("exposure" + o, `Exposure Side ${o}`)}
                        >
                          {o}
                        </Pill>
                      ))}
                    </div>
                    <TextField
                      className="mt-2"
                      value={state.wildland.exposuresNote}
                      onChange={(v) => setWildlandField("exposuresNote", v)}
                      placeholder="Note any exposures"
                    />
                  </>
                )}
              </Section>

              <Section title="Communications">
                <div>
                  <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                    TAC Channel
                  </label>
                  <select
                    value={state.lifeFlight.tacChannel || ""}
                    onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                    className="px-3 py-2 rounded text-sm outline-none w-32"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">—</option>
                    {TAC_CHANNEL_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {state.lifeFlight.tacChannel === "Other" && (
                    <TextField className="mt-2 w-32" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                  )}
                </div>

                <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                  Water Supply
                </label>
                <select
                  value={state.wildland.waterSupply || ""}
                  onChange={(e) => setWildlandField("waterSupply", e.target.value, `Water Supply: ${e.target.value}`)}
                  className="px-3 py-2 rounded text-sm outline-none w-32"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                >
                  <option value="">—</option>
                  {TAC_CHANNEL_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {state.wildland.waterSupply === "Other" && (
                  <TextField className="mt-2 w-32" value={state.wildland.waterSupplyOther} onChange={(v) => setWildlandField("waterSupplyOther", v)} placeholder="Specify" />
                )}
              </Section>

              <Section title="Weather">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Wind Direction
                </label>
                {WIND_DIRECTION_OPTIONS.map((o) => (
                  <Pill key={o} active={state.wildland.windDirection === o} onClick={() => setWildlandField("windDirection", o, `Wind Direction: ${o}`)}>
                    {o}
                  </Pill>
                ))}
                <TextField
                  className="mt-3"
                  label="Wind Speed"
                  value={state.wildland.windSpeed}
                  onChange={(v) => setWildlandField("windSpeed", v)}
                  placeholder="mph"
                />
                <TextField
                  className="mt-3"
                  label="Relative Humidity"
                  value={state.wildland.relativeHumidity}
                  onChange={(v) => setWildlandField("relativeHumidity", v)}
                  placeholder="%"
                />
              </Section>

            </div>

            <GroupHeader>Units & Assignments</GroupHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { key: "suppressionUnits", title: "Suppression", unitOptions: WILDLAND_UNIT_OPTIONS, assignOptions: WILDLAND_ASSIGNMENT_OPTIONS },
                { key: "emsUnits", title: "EMS", unitOptions: MEDIC_UNIT_OPTIONS, assignOptions: EMS_ASSIGNMENT_OPTIONS },
              ].map(({ key, title, unitOptions, assignOptions }) => (
                <Section key={key} title={title}>
                  <div className="flex flex-col gap-2">
                    {state.wildland[key].map((u) => (
                      <div key={u.id} className="rounded p-2" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <div className="flex items-center gap-2">
                          <select
                            value={u.unit}
                            onChange={(e) => updateWildlandUnit(key, u.id, "unit", e.target.value)}
                            className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                            style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                          >
                            <option value="">Unit</option>
                            {unitOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => toggleTechRescueStaged("wildland", key, u.id)}
                            className="px-2 py-1.5 rounded text-xs font-bold"
                            style={{
                              background: u.staged != null ? theme.greenDim : theme.bg,
                              border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                              color: u.staged != null ? theme.green : theme.textSecondary,
                            }}
                          >
                            {u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"}
                          </button>
                          <button
                            onClick={() => toggleTechRescueOnDeck("wildland", key, u.id)}
                            className="px-2 py-1.5 rounded text-xs font-bold"
                            style={{
                              background: u.onDeck != null ? theme.amberDim : theme.bg,
                              border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                              color: u.onDeck != null ? theme.amber : theme.textSecondary,
                            }}
                          >
                            {u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"}
                          </button>
                          <select
                            value={u.assign}
                            onChange={(e) => updateWildlandUnit(key, u.id, "assign", e.target.value)}
                            className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                            style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                          >
                            <option value="">Assignment</option>
                            {assignOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          <button onClick={() => removeWildlandUnit(key, u.id)} style={{ color: theme.textDim }}>
                            <X size={16} />
                          </button>
                        </div>
                        {u.onDeck != null && (
                          <div className="mt-2 pl-1">
                            {SIDE_OPTS.map((o) => (
                              <Pill key={o} active={u.onDeckSide === o} onClick={() => setTechRescueOnDeckSide("wildland", key, u.id, o)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                        {(u.assign === "Division" || (u.assign && u.assign.startsWith("Division "))) && (
                          <div className="mt-2 pl-1">
                            {["A", "B", "C", "D"].map((o) => (
                              <Pill key={o} active={u.assign === `Division ${o}`} onClick={() => updateWildlandUnit(key, u.id, "assign", `Division ${o}`)}>
                                {o}
                              </Pill>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addWildlandUnit(key)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>
                </Section>
              ))}
            </div>

            <GroupHeader>Tactical Objectives</GroupHeader>
            <div className="flex flex-row gap-3 items-stretch">
              {(() => {
                const allWildlandUnits = [
                  ...state.wildland.suppressionUnits.map((u) => ({ ...u, listKey: "suppressionUnits" })),
                  ...state.wildland.emsUnits.map((u) => ({ ...u, listKey: "emsUnits" })),
                ];

                function renderUnitBadge(u) {
                  const isDragging = dragUnit && dragUnit.id === u.id;
                  return (
                    <div
                      key={u.id}
                      onPointerDown={(e) => startUnitDrag(e, u.listKey, u, "wildland")}
                      className="px-3 py-2 rounded text-sm font-semibold text-center"
                      style={{
                        background: isDragging ? theme.goldDim : theme.greenDim,
                        border: `1px solid ${isDragging ? theme.gold : theme.green}`,
                        color: isDragging ? theme.gold : theme.green,
                        touchAction: "none",
                        cursor: "grab",
                        opacity: isDragging ? 0.4 : 1,
                      }}
                    >
                      {u.unit || "Unit"}
                    </div>
                  );
                }

                function renderDivisionBox(letter) {
                  const officers = allWildlandUnits.filter((u) => u.assign === `Division ${WILDLAND_DIVISION_LETTERS[letter]}`);
                  const units = allWildlandUnits.filter((u) => u.assign === letter);
                  const isOfficerHovered = hoveredTaskBox === `${letter} Officer`;
                  const isUnitsHovered = hoveredTaskBox === letter;
                  return (
                    <div key={letter} className="rounded-lg p-4" style={{ background: theme.panel, border: `1px solid ${theme.border}` }}>
                      <h3 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: theme.textSecondary }}>
                        {letter}
                      </h3>
                      <label className="block text-xs uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                        Division Officer
                      </label>
                      <div
                        data-task-box={`${letter} Officer`}
                        className="rounded mb-3"
                        style={{ background: isOfficerHovered ? theme.goldDim : "transparent", border: isOfficerHovered ? `1px solid ${theme.gold}` : "1px solid transparent" }}
                      >
                        {officers.length === 0 ? (
                          <div className="text-sm py-3 text-center rounded" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                            Drag units here
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5">{officers.map((u) => renderUnitBadge(u))}</div>
                        )}
                      </div>

                      <label className="block text-xs uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                        Units
                      </label>
                      <div
                        data-task-box={letter}
                        className="rounded"
                        style={{ background: isUnitsHovered ? theme.goldDim : "transparent", border: isUnitsHovered ? `1px solid ${theme.gold}` : "1px solid transparent" }}
                      >
                        {units.length === 0 ? (
                          <div className="text-sm py-3 text-center rounded" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                            Drag units here
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5">{units.map((u) => renderUnitBadge(u))}</div>
                        )}
                      </div>
                    </div>
                  );
                }

                const stagedUnits = allWildlandUnits.filter((u) => u.staged != null);
                const waterSupplyUnits = allWildlandUnits.filter((u) => u.assign === "Water Supply");
                const isStagingHovered = hoveredTaskBox === "Staging";
                const isWaterSupplyHovered = hoveredTaskBox === "Water Supply";

                return (
                  <>
                    <div style={{ width: 168 }} className="shrink-0">
                      <div
                        data-task-box="Staging"
                        className="rounded-lg p-4 h-full flex flex-col"
                        style={{ background: isStagingHovered ? theme.goldDim : theme.panel, border: `1px solid ${isStagingHovered ? theme.gold : theme.border}` }}
                      >
                        <h3 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: theme.textSecondary }}>
                          Staging
                        </h3>
                        <label className="block text-xs uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                          Units
                        </label>
                        <div className="flex-1">
                          {stagedUnits.length === 0 ? (
                            <div className="text-sm py-3 text-center rounded" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                              Drag units here
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1.5">{stagedUnits.map((u) => renderUnitBadge(u))}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 flex-1">
                      {renderDivisionBox("Alpha")}
                      {renderDivisionBox("Bravo")}
                      {renderDivisionBox("Charlie")}
                      {renderDivisionBox("Delta")}

                      <div className="rounded-lg p-4" style={{ background: theme.panel, border: `1px solid ${theme.border}` }}>
                        <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: theme.textSecondary }}>
                          Medical / Rehab
                        </h3>
                        {wildlandAssignedEmsUnits.length === 0 && wildlandAssignedRehabUnits.length === 0 && (
                          <div className="text-xs py-3 text-center rounded" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                            No units assigned
                          </div>
                        )}
                        {wildlandAssignedEmsUnits.length > 0 && (
                          <div className="mb-2">
                            <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Medical
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                              {wildlandAssignedEmsUnits.map((u) => (
                                <span
                                  key={u}
                                  className="px-2 py-1.5 rounded text-xs font-bold"
                                  style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold, fontFamily: mono }}
                                >
                                  {u}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} compact active={state.wildland.medicalRehab.medicalSide === o} onClick={() => setWildlandMedicalRehabField("medicalSide", o, `Medical: Side ${o}`)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          </div>
                        )}
                        {wildlandAssignedRehabUnits.length > 0 && (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                              Rehab
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                              {wildlandAssignedRehabUnits.map((u) => (
                                <span
                                  key={u}
                                  className="px-2 py-1.5 rounded text-xs font-bold"
                                  style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold, fontFamily: mono }}
                                >
                                  {u}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap">
                              {SIDE_OPTS.map((o) => (
                                <Pill key={o} compact active={state.wildland.medicalRehab.rehabSide === o} onClick={() => setWildlandMedicalRehabField("rehabSide", o, `Rehab: Side ${o}`)}>
                                  {o}
                                </Pill>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        data-task-box="Water Supply"
                        className="rounded-lg p-4"
                        style={{ background: isWaterSupplyHovered ? theme.goldDim : theme.panel, border: `1px solid ${isWaterSupplyHovered ? theme.gold : theme.border}` }}
                      >
                        <h3 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: theme.textSecondary }}>
                          Water Supply
                        </h3>
                        <label className="block text-xs uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                          Fill-Site Location
                        </label>
                        <TextField
                          className="mb-3"
                          value={state.wildland.fillSiteLocation}
                          onChange={(v) => setWildlandField("fillSiteLocation", v)}
                          placeholder="Fill-Site Location"
                        />

                        <label className="block text-xs uppercase tracking-wide mb-2" style={{ color: theme.textDim }}>
                          Units
                        </label>
                        {waterSupplyUnits.length === 0 ? (
                          <div className="text-sm py-3 text-center rounded" style={{ color: theme.textDim, border: `1px dashed ${theme.border}` }}>
                            Drag units here
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5">{waterSupplyUnits.map((u) => renderUnitBadge(u))}</div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Safety">
                {LCES_ITEMS.map((it) => (
                  <CheckRow key={it.key} label={it.label} value={state.wildland.safety[it.key]} onToggle={() => toggleWildlandSafety(it.key, it.label)} />
                ))}
              </Section>
            </div>

            <GroupHeader>Support</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Section title="Mutual Aid">
                <CheckRow label="Fire" value={state.wildland.mutualAid.fire} onToggle={() => toggleWildlandMutualAid("fire", "Fire")} />
                {state.wildland.mutualAid.fire != null && (
                  <select
                    value={state.wildland.mutualAid.fireDept}
                    onChange={(e) => setWildlandMutualAidField("fireDept", e.target.value)}
                    className="w-full px-3 py-2 rounded text-sm outline-none mb-1.5"
                    style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                  >
                    <option value="">Select department</option>
                    {MUTUAL_AID_FIRE_DEPTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                )}
                {WILDLAND_MUTUAL_AID_ITEMS.filter((it) => it.key !== "fire").map((it) => (
                  <CheckRow
                    key={it.key}
                    label={it.label}
                    value={state.wildland.mutualAid[it.key]}
                    onToggle={() => toggleWildlandMutualAid(it.key, it.label)}
                  />
                ))}
              </Section>
            </div>

            </div>
          )}

          {tab === "99bravo" && (
            <div className="flex flex-col gap-6">
            <GroupHeader>Size-Up & Command</GroupHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Section title="Command">
                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Unit
                </label>
                <select
                  value={state.command.unit || ""}
                  onChange={(e) => setCommand("unit", e.target.value, `Command Unit: ${e.target.value}`)}
                  className="w-full px-3 py-2 rounded text-sm outline-none mb-3"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                >
                  <option value="">—</option>
                  {COMMAND_UNIT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <TextField label="Command Name" value={state.command.name} onChange={(v) => setCommand("name", v)} placeholder="IC Name" className="mb-3" />

                <label className="block text-xs uppercase tracking-wide mb-1" style={{ color: theme.textDim }}>
                  Command Post Location
                </label>
                {SIDE_OPTS.map((o) => (
                  <Pill key={o} active={state.command.location === o} onClick={() => setCommand("location", o, `Command Post Location: ${o}`)}>
                    {o}
                  </Pill>
                ))}

                <label className="block text-xs uppercase tracking-wide mb-1 mt-3" style={{ color: theme.textDim }}>
                  TAC Channel
                </label>
                <select
                  value={state.lifeFlight.tacChannel || ""}
                  onChange={(e) => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`)}
                  className="px-3 py-2 rounded text-sm outline-none w-32"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                >
                  <option value="">—</option>
                  {TAC_CHANNEL_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {state.lifeFlight.tacChannel === "Other" && (
                  <TextField className="mt-2 w-32" value={state.lifeFlight.tacChannelOther} onChange={(v) => setLifeFlightField("tacChannelOther", v)} placeholder="Specify" />
                )}

                <div className="text-xs font-bold uppercase tracking-wide mb-2 mt-3 pt-3" style={{ color: theme.textSecondary, borderTop: `1px solid ${theme.borderSoft}` }}>
                  Command Transfer
                </div>
                <CheckRow label="PAR" value={state.ninetyNineBravo.commandTransferPar} onToggle={toggleNinetyNineBravoCommandPar} />
                {LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS.map((it) => (
                  <React.Fragment key={it.key}>
                    <CheckRow label={it.label} value={state.commandTransfer[it.key]} onToggle={() => toggleSimple("commandTransfer", it.key, it.label)} />
                    {it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (
                      <div className="mb-1.5 pl-1">
                        {["Investigative", "Offensive", "Defensive"].map((o) => (
                          <Pill
                            key={o}
                            active={state.strategyConfirmationMode === o}
                            onClick={() => setState((s) => ({ ...s, strategyConfirmationMode: o }))}
                            color={o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber}
                          >
                            {o}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Section>

              <Section title="99-Bravo Checklist">
                <CheckRow
                  label="Review MDC Notes"
                  value={state.ninetyNineBravo.checklist.reviewMdcNotes}
                  onToggle={() => toggleNinetyNineBravoChecklist("reviewMdcNotes", "Review MDC Notes")}
                />
                <CheckRow
                  label="Request TAC Channel"
                  value={state.ninetyNineBravo.checklist.requestTacChannel}
                  onToggle={() => toggleNinetyNineBravoChecklist("requestTacChannel", "Request TAC Channel")}
                />
                <CheckRow
                  label="PAR"
                  value={state.ninetyNineBravo.checklist.par}
                  onToggle={() => toggleNinetyNineBravoChecklist("par", "PAR")}
                />
                <CheckRow
                  label="Law Enforcement Status"
                  value={state.ninetyNineBravo.checklist.lawEnforcementStatus}
                  onToggle={() => toggleNinetyNineBravoChecklist("lawEnforcementStatus", "Law Enforcement Status")}
                />
                {state.ninetyNineBravo.checklist.lawEnforcementStatus != null && (
                  <div className="mt-2 pl-1">
                    {["Emergency", "Non-Emergency", "On-Scene"].map((o) => (
                      <Pill
                        key={o}
                        active={state.ninetyNineBravo.lawEnforcementStatusMode === o}
                        onClick={() => setNinetyNineBravoField("lawEnforcementStatusMode", o, `Law Enforcement Status: ${o}`)}
                      >
                        {o}
                      </Pill>
                    ))}
                  </div>
                )}
                <CheckRow
                  label="Transmit"
                  value={state.ninetyNineBravo.checklist.transmit}
                  onToggle={() => toggleNinetyNineBravoChecklist("transmit", "Transmit")}
                />
                {state.ninetyNineBravo.checklist.transmit != null && (
                  <div className="text-sm p-3 rounded mb-1.5" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
                    "Command to Dispatch, the scene is secured and I have a PAR on all units. Discontinue the 99-Bravo event at{" "}
                    {state.command.location || "(Command Location)"}. Command will be terminated and you can release{" "}
                    {(state.lifeFlight.tacChannel === "Other" ? state.lifeFlight.tacChannelOther : state.lifeFlight.tacChannel) || "(TAC Channel)"}.
                  </div>
                )}
                <CheckRow
                  label="Termination"
                  value={state.ninetyNineBravo.checklist.termination}
                  onToggle={() => toggleNinetyNineBravoChecklist("termination", "Termination")}
                />
              </Section>
            </div>

            <GroupHeader>Units & Assignments</GroupHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { key: "suppressionUnits", title: "Suppression", unitOptions: UNIT_OPTIONS, assignOptions: NINETY_NINE_BRAVO_ASSIGNMENT_OPTIONS },
                { key: "emsUnits", title: "EMS", unitOptions: MEDIC_UNIT_OPTIONS, assignOptions: NINETY_NINE_BRAVO_ASSIGNMENT_OPTIONS },
              ].map(({ key, title, unitOptions, assignOptions }) => (
                <Section key={key} title={title}>
                  <div className="flex flex-col gap-2">
                    {state.ninetyNineBravo[key].map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 rounded" style={{ background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                        <select
                          value={u.unit}
                          onChange={(e) => updateNinetyNineBravoUnit(key, u.id, "unit", e.target.value)}
                          className="w-24 px-2 py-1.5 rounded text-sm outline-none"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontFamily: mono }}
                        >
                          <option value="">Unit</option>
                          {unitOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <select
                          value={u.assign}
                          onChange={(e) => updateNinetyNineBravoUnit(key, u.id, "assign", e.target.value)}
                          className="flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0"
                          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        >
                          <option value="">Assignment</option>
                          {assignOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => removeNinetyNineBravoUnit(key, u.id)} style={{ color: theme.textDim }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addNinetyNineBravoUnit(key)}
                      className="flex items-center justify-center gap-1 py-2 rounded text-xs font-bold"
                      style={{ background: theme.goldDim, border: `1px solid ${theme.gold}`, color: theme.gold }}
                    >
                      <Plus size={14} /> Add Unit
                    </button>
                  </div>
                </Section>
              ))}
            </div>

            </div>
          )}

          {tab === "log" && (
            <Section title="Incident Log">
              <div className="flex gap-2 mb-4">
                <input
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNote()}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-2 rounded text-sm outline-none min-w-0"
                  style={{ background: theme.panelAlt, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                />
                <button
                  onClick={addNote}
                  className="flex items-center gap-1 px-3 py-2 rounded text-sm font-bold shrink-0"
                  style={{ background: theme.gold, color: "#fff" }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                {state.log.length === 0 && (
                  <div className="text-sm py-6 text-center" style={{ color: theme.textDim }}>
                    Nothing logged yet.
                  </div>
                )}
                {state.log.map((entry) => (
                  <div key={entry.id} className="flex gap-3 text-sm">
                    <span className="tabular-nums shrink-0" style={{ color: theme.textDim, fontFamily: mono }}>
                      {formatElapsed(entry.time)}
                    </span>
                    <span>{entry.text}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<TacticalWorksheet />);
