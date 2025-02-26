import Header from './../components/Banner'

const data = {
	title: '404 Page Not Found',
	content: 'The page you are looking for does not exist.'
};

export default function Error () {
	return (
		<Header bannerData={data}/>
	);
};