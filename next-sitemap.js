module.exports = {
  siteUrl: 'https://www.mragain.nl',
  generateRobotsTxt: process.env.NODE_ENV === "production",
  exclude: ['/DefferedNextScript', 
            '/EmailConfirmation', 
            '/HeadWithoutPreload',
            '/dashboard',
            '/dashboard/PictureWall',
            '/devices',
            '/history',
            '/repair-management',
            '/shop-management'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.mragain.nl/dynamic-sitemap.xml',
    ],
  }
}
