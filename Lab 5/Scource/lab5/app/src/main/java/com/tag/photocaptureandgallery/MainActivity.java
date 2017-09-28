package com.tag.photocaptureandgallery;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import clarifai2.api.ClarifaiBuilder;
import clarifai2.api.ClarifaiClient;
import clarifai2.api.ClarifaiResponse;
import clarifai2.api.request.ClarifaiRequest;
import clarifai2.dto.input.ClarifaiInput;
import clarifai2.dto.input.ClarifaiImage;
import clarifai2.dto.model.ConceptModel;
import clarifai2.dto.model.output.ClarifaiOutput;
import clarifai2.dto.prediction.Concept;
import okhttp3.OkHttpClient;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.example.takeimage.R;

import org.json.JSONArray;
import org.json.JSONObject;

public class MainActivity extends Activity {

	private int REQUEST_CAMERA = 0, SELECT_FILE = 1;
	private Button btnSelect;
	private ImageView ivImage;
	private String userChoosenTask;
	private ClarifaiClient client;
	private TextView tv,h;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);


		client=new ClarifaiBuilder("cbcc607dbc29409e87403e35fe78fd6c")
				.client(new OkHttpClient()) // OPTIONAL. Allows customization of OkHttp by the user
				.buildSync(); // or use .build() to get a Future<ClarifaiClient>

		btnSelect = (Button) findViewById(R.id.btnSelectPhoto);
		btnSelect.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				selectImage();
			}
		});
		ivImage = (ImageView) findViewById(R.id.ivImage);
		tv=(TextView) findViewById(R.id.text1);
h=(TextView) findViewById(R.id.head);
	}

	@Override
	public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
		switch (requestCode) {
			case Utility.MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE:
				if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
					if(userChoosenTask.equals("Take Photo"))
						cameraIntent();
					else if(userChoosenTask.equals("Choose from Library"))
						galleryIntent();
				} else {
					//code for deny
				}
				break;
		}
	}

	private void selectImage() {
		final CharSequence[] items = { "Take Photo", "Choose from Library",
				"Cancel" };

		AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
		builder.setTitle("Add Photo!");
		builder.setItems(items, new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int item) {
				boolean result=Utility.checkPermission(MainActivity.this);

				if (items[item].equals("Take Photo")) {
					userChoosenTask ="Take Photo";
					if(result)
						cameraIntent();

				} else if (items[item].equals("Choose from Library")) {
					userChoosenTask ="Choose from Library";
					if(result)
						galleryIntent();

				} else if (items[item].equals("Cancel")) {
					dialog.dismiss();
				}
			}
		});
		builder.show();
	}

	private void galleryIntent()
	{
		Intent intent = new Intent();
		intent.setType("image/*");
		intent.setAction(Intent.ACTION_GET_CONTENT);//
		startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
	}

	private void cameraIntent()
	{
		Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		startActivityForResult(intent, REQUEST_CAMERA);
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);

		if (resultCode == Activity.RESULT_OK) {
			if (requestCode == SELECT_FILE)
				onSelectFromGalleryResult(data);
			else if (requestCode == REQUEST_CAMERA)
				onCaptureImageResult(data);
			//cbcc607dbc29409e87403e35fe78fd6c
	/*
					client=new ClarifaiBuilder("cbcc607dbc29409e87403e35fe78fd6c").buildSync();


			final List<ClarifaiOutput<Concept>> predictionResults =
					client.getDefaultModels().generalModel() // You can also do Clarifai.getModelByID("id") to get custom models
							.predict()
							.withInputs(
									ClarifaiInput.forImage(ClarifaiImage.of(ivImage.getTransitionName().toString()))
							)
							.executeSync() // optionally, pass a ClarifaiClient parameter to override the default client instance with another one
							.get();

			tv.append(predictionResults.get(1).toString());
*/
		}
	}

	private void onCaptureImageResult(Intent data) {
		Bitmap thumbnail = (Bitmap) data.getExtras().get("data");
		ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		thumbnail.compress(Bitmap.CompressFormat.JPEG, 90, bytes);

		File destination = new File(Environment.getExternalStorageDirectory(),
				System.currentTimeMillis() + ".jpg");

		FileOutputStream fo;
		try {
			destination.createNewFile();
			fo = new FileOutputStream(destination);
			fo.write(bytes.toByteArray());
			fo.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		ivImage.setImageBitmap(thumbnail);
		onImagePicked(bytes.toByteArray());
	}

	@SuppressWarnings("deprecation")
	private void onSelectFromGalleryResult(Intent data) {

		Bitmap bm=null;
		if (data != null) {
			try {
				bm = MediaStore.Images.Media.getBitmap(getApplicationContext().getContentResolver(), data.getData());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}


/*
		final List<ClarifaiOutput<Concept>> predictionResults =
				client.getDefaultModels().generalModel() // You can also do Clarifai.getModelByID("id") to get custom models
						.predict()
						.withInputs(
								ClarifaiInput.forImage(bm.g)
						)
						.executeSync() // optionally, pass a ClarifaiClient parameter to override the default client instance with another one
						.get();
*/
		//	tv.append(predictionResults.get(0).toString());

		ivImage.setImageBitmap(bm);
		ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		bm.compress(Bitmap.CompressFormat.JPEG, 90, bytes);
		onImagePicked(bytes.toByteArray());
	}
	private void onImagePicked(@NonNull final byte[] imageBytes) {

		new AsyncTask<Void, Void, ClarifaiResponse<List<ClarifaiOutput<Concept>>>>() {
			@Override
			protected ClarifaiResponse<List<ClarifaiOutput<Concept>>> doInBackground(Void... params) {
				final ConceptModel generalModel = client.getDefaultModels().generalModel();
				return generalModel.predict()
						.withInputs(ClarifaiInput.forImage(ClarifaiImage.of(imageBytes)))
						.executeSync();
			}

			@Override
			protected void onPostExecute(ClarifaiResponse<List<ClarifaiOutput<Concept>>> response) {
				if (!response.isSuccessful()) {
					return;
				}
				final List<ClarifaiOutput<Concept>> predictions = response.get();
				if (predictions.isEmpty()) {
					return;
				}
				String output = predictions.get(0).data().get(0).name();
				h.setText(output);
				//tv.append(output);
				mylocation g = new mylocation(getApplicationContext());
				Location l = g.getLocation();
				if (l != null) {
					double lat = l.getLatitude();
					double lon = l.getLongitude();
					Stores(lat, lon, output);
				}
			}
		}.execute();


	}


	private void Stores(Double longitude, Double latitude, String keyword) {
		String getURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
				"location=" + longitude + "," + latitude + "&" +
				"radius=2000&" +
				"type=department_store,restaurant,book_store,clothing_store,electronics_store,home_goods_store,shoe_store&" +
				"keyword=" + keyword + "&" +

				"key=AIzaSyC6yiwU7P9a3XpH5fDNwrdBAZSgI9NyoZY";
		OkHttpClient client = new OkHttpClient();
		try {
		Request request = new Request.Builder().url(getURL).build();
			client.newCall(request).enqueue(new Callback() {
				@Override
				public void onFailure(Call call, IOException e) {
					System.out.println(e.getMessage());
				}
				@Override
				public void onResponse(Call call, Response response) throws IOException {
					final JSONObject jsonResult;
					final JSONArray jsonArray;
					final String result = response.body().string();
					final String output;
					try {
						jsonResult = new JSONObject(result);
						jsonArray = (JSONArray) jsonResult.get("results");

						String tempOutput = "";
						for (int i = 0 ; i< jsonArray.length(); i++) {
							JSONObject jsonObject = (JSONObject) jsonArray.get(i);
							String name = (String)jsonObject.get("name");
							String addr = (String)jsonObject.get("vicinity");
							tempOutput += "" + name + "\n" + "address:" + addr + "\n\n";
						}
						output = tempOutput;

						//Log.d("okHttp", jsonResult.toString());
						runOnUiThread(new Runnable() {
							@Override
							public void run() {
								tv.setText(output);
							}
						});
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
