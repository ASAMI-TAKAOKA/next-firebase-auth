import React from 'react';

const About = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-10">
            Mom and Baby Help へようこそ
          </h1>
          <p className="text-lg md:text-xl">
            子育てを頑張るママさん・パパさんの手助けとなるアプリを目指しています。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-3xl font-bold text-center mb-12">
            このアプリの機能について
          </h2>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 w-full md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <img src="https://via.placeholder.com/100" alt="相談" className="w-16 h-16 mb-4 mx-auto rounded-full" />
                <h3 className="text-xl font-bold mb-2 text-center">悩みを気軽に相談できる</h3>
                <p>
                  赤ちゃんを育てている者同士、お互いに気軽に相談したり相談に乗ったりすることができます。
                </p>
              </div>
            </div>
            <div className="p-4 w-full md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <img src="https://via.placeholder.com/100" alt="離乳食" className="w-16 h-16 mb-4 mx-auto rounded-full" />
                <h3 className="text-xl font-bold mb-2 text-center">離乳食作りをサポート</h3>
                <p>
                  献立のカレンダー登録機能や離乳食ごとの集計機能で、栄養が偏ることなく離乳食を作ることができます。
                </p>
              </div>
            </div>
            <div className="p-4 w-full md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <img src="https://via.placeholder.com/100" alt="服装提案" className="w-16 h-16 mb-4 mx-auto rounded-full" />
                <h3 className="text-xl font-bold mb-2 text-center">赤ちゃんの服装をご提案</h3>
                <p>
                  服装の提案機能で、「今日の天気や気温に合った子供の服装がわからない…」という悩みを解消します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3">
              <h5 className="text-lg font-bold mb-2">Contact Me</h5>
              <p className="text-sm">
                Email: xxxxxxxxxx@com
              </p>
              <p className="text-sm">
                Phone: xxx-xxxx-xxxx
              </p>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-gray-500">
            &copy; 2024 Mom and Baby Help. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
