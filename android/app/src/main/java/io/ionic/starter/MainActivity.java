package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import.com.getcapacitor.Plugin;
import.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {

@override
public void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);

    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>)(){{
    add(GoogleAuth.class);
    }});
}

}
