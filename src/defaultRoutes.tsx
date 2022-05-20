import { DomainPresale } from './Pages/DomainPresale/DomainPresale';
import path from "path";
import { Route } from "react-router-dom";
import Creators, { TopCreators } from "./Components/Creators";
import Notifications from "./Components/Icons/Notifications";
import { SelectMoodForm } from "./Components/SelectMood";
import Spotlights from "./Components/Spotlights";
import TopFolders from "./Components/TopFolders";
import { UserStake } from "./Components/UserWidget";
import { About } from "./Pages/About";
import { JoinDao } from "./Pages/JoinDao";
import { Mood } from "./Pages/Mood/Mood";
import { MoodCreate } from "./Pages/Mood/MoodCreate";
import MyMoods from "./Pages/Mood/MyMoods";
import { Post, PostInTags } from "./Pages/Post/Post";
import { PostCreate } from "./Pages/Post/PostCreate";
import { Privacy } from "./Pages/Privacy";
import SearchCreative from "./Pages/SearchCreative";
import { SearchCreativePost } from "./Pages/SearchCreativePost";
import { Product } from "./Pages/Store/Product";
import { TOS } from "./Pages/TOS";
import { LegacyImport } from "./Pages/User/LegacyImport";
import UserTop from "./Pages/User/Top";
import { User } from "./Pages/User/User";
import { UserCreate } from "./Pages/User/UserCreate";
import { UserInvite } from "./Pages/User/UserInvite";
import { UserUpdate } from "./Pages/User/UserUpdate";
import { NLView } from './types';
import Explore from './Pages/Explore/Explore';
import { Component } from 'react';
import { useAppState } from './overmind';
import { Auth } from './Pages/Auth/Auth';
import SearchTag from './Pages/Tag/TagSearch';
import ProposalList, { ProposalsPage } from "./Pages/NewlifeDao/ProposalList";
import NewProposal from "./Pages/NewlifeDao/NewProposal";
import ViewProposal, { ViewProposalPage } from "./Pages/NewlifeDao/ViewProposal";
import DaoCreate from './Pages/NewlifeDao/DaoCreate';


type HostDef = {
	hosts: string[],
	components: {
		Explore: NLView,
		Root: NLView
	}
};

const UnknownHost: HostDef = {
	hosts: [],
	components: {
		Root: () => <>UnknownHost</>,
		Explore: () => <></>
	}
};

const testDomain = window.location.host;

const HostToDomain: HostDef[] = [
	{
		hosts: [
			"newlink.page"
		],
		components: {
			Root: DomainPresale,
			Explore: UserTop
		}
	},
	{
		hosts: [
			"localhost",
			"www.newlife.io",
			"web.newlife.io",
			"web-dev.newlife.io",
			"share.newlife.io",
			"test.newlife.io"
		],
		components: {
			Root: DomainPresale,
			Explore: Explore
		}
	},
	{
		hosts: [
			"unsid.org",
			"web-dev.unsid.org"
		],
		components: {
			Root: DomainPresale,
			Explore: () => <>
				You are good to go.<br />Use your UNSID to access the apps in the Newcoin ecosystem:
				<br />
				<br />
				<ul>
					<li>
						<a href="https://web.newlife.io">newlife.IO</a>
					</li>
					<li>
						<a href="https://web.newlife.io">newthis.IO</a>
					</li>
					<li>
						<a href="https://web.newlife.io">newthat.OI</a>
					</li>
				</ul>
			</>
		}
	}
];

// const isNewlink = /newlink.page/.test(window.location.host)

const currentHost = window.location.host.replace(/:\d+/, "");
const HostBasedComponents = HostToDomain.find(htd => htd.hosts.find(h => h === currentHost))?.components || UnknownHost.components;

const View: NLView = (props) => <div {...props}>{props.children}</div>;
const Topics = () => <h3>Topics</h3>;

const OverridableRoute: React.FunctionComponent<any> = (props: any) => {
	const state = useAppState();
	const component = state.config.routes.overrides[props.path]
	const _props = component ? { ...props, component } : props;
	return <Route {..._props} />
}

export const DEFAULT_ROUTES = [
	<OverridableRoute key="a" exact path="/auth" component={Auth} />,
	<OverridableRoute key="h" exact path="/" component={HostBasedComponents.Root} />,
	<OverridableRoute key="dj" exact path="/dao/join" component={JoinDao} />,
	<OverridableRoute key="tc" exact path="/top/creators" component={TopCreators} />,
	<OverridableRoute key="tf" exact path="/top/folders" component={TopFolders} />,
	<OverridableRoute key="tp" exact path="/top/posts" component={Creators} />,
	<OverridableRoute key="np" exact path="/newlink.page" component={UserTop} />,
	<OverridableRoute key="c" exact path="/user-create" component={UserCreate} />,
	<OverridableRoute key="u" exact path="/my/profile" component={User} />,
	<OverridableRoute key="u" exact path="/my/profile/update" component={UserUpdate} />,
	<OverridableRoute key="d" exact path="/my/profile/notifications" component={Notifications} />,
	// <OverridableRoute key="d" exact path="/notifications" component={Notifications} />,
	<OverridableRoute key="e" path="/explore" component={HostBasedComponents.Explore} />,
	<OverridableRoute key="mm" path="/my/folders" component={MyMoods} />,
	<OverridableRoute key="t" path="/topics" component={Topics} />,
	<OverridableRoute key="b" path="/about" component={About} />,
	<OverridableRoute key="p" path="/post/:id" component={Post} />,
	<OverridableRoute key="pc" path="/post-create" component={PostCreate} />,
	<OverridableRoute key="mc" path="/mood-create" component={MoodCreate} />,
	<OverridableRoute key="sc" exact path="/search-creative" component={SearchCreative} />,
	<OverridableRoute key="scv" exact path="/search-creative/vote" component={SearchCreativePost} />,
	<OverridableRoute key="mpo" exact path="/mood/:moodId/:postId" component={Post} />,
	<OverridableRoute key="mo" exact path="/mood/:moodId" component={Mood} />,
	<OverridableRoute key="mp" exact path="/folder/:moodId/:postId" component={Post} />,
	<OverridableRoute key="m" exact path="/folder/:moodId" component={Mood} />,
	<OverridableRoute key="us" path="/user/stake/:id" component={UserStake} />,
	<OverridableRoute key="v" exact path="/user/:username" component={User} />,
	<OverridableRoute key="ui" exact path="/user/invite" component={UserInvite} />,
	<OverridableRoute key="s" exact path="/payment/subscription" component={Product} />,
	<OverridableRoute key="ue" exact path="/auth/newlife-members" component={LegacyImport} />,
	<OverridableRoute key="sp" exact path="/spotlights" component={Spotlights} />,
	<OverridableRoute key="sf" exact path="/save-folder" component={SelectMoodForm} />,
	<OverridableRoute key="ts" exact path="/terms_of_service" component={TOS} />,
	<OverridableRoute key="pp" exact path="/privacy_policy" component={Privacy} />,
	<OverridableRoute key="st" exact path="/search" component={SearchTag} />,
	<OverridableRoute key="st" exact path="/tags/:tags/:postId" component={PostInTags} />,
	<OverridableRoute key="ds" exact path="/newlife-dao" component={ProposalList} />,
	<OverridableRoute key="dg" exact path="/newlife-dao/new-proposal" component={NewProposal} />,
	<OverridableRoute key="drp" exact path="/newlife-dao/proposal/:id" component={ViewProposal} />,
	<OverridableRoute key="dcp" exact path="/dao/:daoOwner/proposal-create" component={NewProposal} />,
	<OverridableRoute key="dvp" exact path="/dao/:daoOwner/proposal/:id" component={ViewProposalPage} />,
	<OverridableRoute key="dc" exact path="/dao/create" component={DaoCreate} />,
	<OverridableRoute key="dpl" exact path="/dao/owner/:daoOwner" component={ProposalsPage} />
];
